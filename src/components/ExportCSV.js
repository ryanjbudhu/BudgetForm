import React from "react";
import { Button } from "antd";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExportCSV = ({ csvData, fileName }) => {
    const fileType = "application/octet-stream";
    // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    // TODO: format the excel to look nice

    const exportToCSV = (csvData, fileName) => {
        const convertedData = getOverviewSheet(csvData);
        const ws = XLSX.utils.json_to_sheet(convertedData);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Overview");

        // (start.unix - end.unix)/UNIX_YEAR = diff in years
        const years = Math.ceil((csvData.info.end - csvData.info.start) / 31557600);
        console.log(`${years} year(s)`);
        const detailedSheets = getEachTypeSheet(csvData);
        detailedSheets.forEach(({ sheetName, sheetData }) => {
            const pageSheet = XLSX.utils.json_to_sheet(sheetData);
            XLSX.utils.book_append_sheet(wb, pageSheet, sheetName);
        });

        wb.Custprops = {
            Vendor: csvData.info.name,
            Project: csvData.info.project,
            Division: csvData.info.division,
            "Start Date": csvData.info.start,
            "End Date": csvData.info.end,
            Grant: csvData.info.grant,
            Phone: csvData.info.phone,
        };
        const excelBuffer = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array",
            Props: {
                Title: csvData.info.project,
                Subject: csvData.info.division,
                Author: csvData.info.contact,
                Manager: csvData.info.name,
                Company: csvData.info.division,
                Category: csvData.info.grant ? "Grant" : "Non Grant",
                CreatedDate: new Date(),
            },
        });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    const getEachTypeSheet = (data) => {
        let sheets = [];
        data.pages.forEach((pageObj) => {
            let [sheetTotal, sheetData] = getPageData(pageObj, data.info, true);
            sheetData.push({ pagename: `Total ${pageObj.label}`, total: sheetTotal });
            sheets.push({
                sheetName: pageObj.label,
                sheetData: sheetData,
            });
        });
        return sheets;
    };

    const getPageData = (pageObj, infoData, getChildren) => {
        let htotal = 0;
        let headers = [];
        let subHeaders = [];
        pageObj.items.forEach((header) => {
            let headerObj;
            if (getChildren) headerObj = { pagename: `Total ${header.name}` };
            else headerObj = { pagename: header.name };
            let childObj;
            headerObj.quantity = 0;
            headerObj.rate = 0;
            headerObj.total = 0;
            if (getChildren) headers.push({ pagename: header.name });
            header.children.forEach((child) => {
                childObj = {
                    pagename: child.name,
                    quantity: child.quantity,
                    rate: child.rate,
                    total:
                        Number.parseInt(child.quantity) * Number.parseFloat(child.rate),
                };
                headerObj.quantity += Number.parseInt(child.quantity);
                headerObj.rate += Number.parseFloat(child.rate);
                headerObj.total += childObj.total;
                if (getChildren && childObj !== undefined) {
                    headers.push(childObj);
                }
            });

            if (header.children.length > 0) {
                headerObj.rate = headerObj.rate / header.children.length;
            } else if (getChildren) {
                headers.push([]);
            }
            htotal += headerObj.total;
            subHeaders.push(headerObj);
            headers.push(headerObj);
            if (getChildren) headers.push([]);
        });

        // Calculate Composite Fringes for labor
        if (pageObj.title === "labor") {
            htotal += (infoData.ftfringe / 100) * subHeaders[0].total;
            htotal += (infoData.ptfringe / 100) * subHeaders[1].total;
        }

        return [htotal, headers];
    };

    const getOverviewSheet = (data) => {
        let arrData = [];
        let esttotal = 0;
        let direct = 0;
        let subcontractCost = 0;
        data.pages.forEach((pageObj) => {
            arrData.push([], { pagename: pageObj.label });
            const [pageTotal, pageData] = getPageData(pageObj, data.info, false);
            arrData = arrData.concat(pageData);
            if (pageObj.title === "consult") {
                subcontractCost = pageData
                    .filter((val) => val.pagename.split(" ")[0] === "Subcontracts")
                    .reduce((acc, el) => acc + Number.parseInt(el.total), 0);
            }
            if (pageObj.title !== "overhead") {
                direct += pageTotal;
                esttotal += pageTotal;
            } else {
                const rent = pageData.find((val) => val.pagename === "Rent").total;
                const faOff =
                    rent > 0
                        ? (esttotal - subcontractCost + rent) * (data.info.faoff / 100)
                        : 0;
                const faOn =
                    rent === 0
                        ? (esttotal - subcontractCost + rent) * (data.info.faon / 100)
                        : 0;
                esttotal += faOff + faOn;
                arrData.push(
                    {
                        pagename: `NJII - F&A Rate - Calculation Off-Site (${data.info.faoff}%)`,
                        total: faOff,
                    },
                    {
                        pagename: `NJII - F&A Rate - Calculation On-Site (${data.info.faon}%)`,
                        total: faOn,
                    }
                );
            }
            arrData.push({
                pagename: `Total ${pageObj.label}`,
                total: pageTotal.toFixed(2),
            });
        });

        arrData.push(
            [],
            [],
            {
                pagename: "Total Estimated - Before Margin",
                total: esttotal.toFixed(2),
            },
            {
                pagename: "Direct Costs (Budget Use Only)",
                total: direct.toFixed(2),
            },
            {
                pagename: "Gross Margin (Market Based)",
                rate: `${data.info.gross / 100 || 0}%`,
                total: ((data.info.gross / 100 || 0) * esttotal).toFixed(2),
            },
            [],
            {
                pagename: "Total Estimated Price",
                total: ((data.info.gross / 100 || 0) * esttotal + esttotal).toFixed(2),
            }
        );
        return arrData;
    };

    return (
        <Button
            disabled={Object.keys(csvData.info).some(
                (key) => csvData.info[key] === "" || csvData.info[key] === null
            )}
            type="primary"
            onClick={(e) => exportToCSV(csvData, fileName)}
        >
            Export
        </Button>
    );
};

export default ExportCSV;
