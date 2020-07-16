import React from "react";
import { Button } from "antd";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExportCSV = ({ csvData, fileName }) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    // TODO: format the excel to look nice

    const exportToCSV = (csvData, fileName) => {
        const convertedData = getOverviewSheet(csvData);
        const ws = XLSX.utils.json_to_sheet(convertedData);
        let wb = XLSX.utils.book_new();
        // const overviewBook = { Sheets: { data: ws }, SheetNames: ["Overview"] };
        XLSX.utils.book_append_sheet(wb, ws, "Overview");

        const detailedSheets = getEachTypeSheet(csvData);
        detailedSheets.forEach(({ sheetName, sheetData }) => {
            const pageSheet = XLSX.utils.json_to_sheet(sheetData);
            XLSX.utils.book_append_sheet(wb, pageSheet, sheetName);
        });

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    const getEachTypeSheet = (data) => {
        let sheets = [];
        data.forEach((pageObj) => {
            let [sheetTotal, sheetData] = getPageData(pageObj, true);
            sheetData.push({ pagename: `Total ${pageObj.label}`, total: sheetTotal });
            sheets.push({
                sheetName: pageObj.label,
                sheetData: sheetData,
            });
        });

        return sheets;
    };

    const getPageData = (pageObj, getChildren) => {
        let htotal = 0;
        let headers = [];
        pageObj.items.forEach((header) => {
            let headerObj;
            if (getChildren) headerObj = { pagename: `Total ${header.name}` };
            else headerObj = { pagename: header.name };
            let childObj;
            headerObj.quantity = 0;
            headerObj.rate = 0;
            headerObj.total = 0;
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
            });

            if (header.children.length > 0) {
                headerObj.rate = headerObj.rate / header.children.length;
            }
            htotal += headerObj.total;
            if (getChildren && childObj !== undefined) {
                headers.push(childObj);
            }
            headers.push(headerObj);
        });
        return [htotal, headers];
    };

    const getOverviewSheet = (data) => {
        let arrData = [[]];
        let total = 0;
        data.forEach((pageObj) => {
            arrData.push({ pagename: pageObj.label });
            const [pageTotal, pageData] = getPageData(pageObj, false);
            arrData.push([...pageData]);
            arrData.push({
                pagename: `Total ${pageObj.label}`,
                total: pageTotal.toFixed(2),
            });
            arrData.push([]);
            total += pageTotal;
        });
        arrData.push({ pagename: "Total", total: total.toFixed(2) });
        return arrData;
    };

    return (
        <Button
            style={{
                marginBottom: "4rem",
            }}
            type="primary"
            onClick={(e) => exportToCSV(csvData, fileName)}
        >
            Export
        </Button>
    );
};

export default ExportCSV;
