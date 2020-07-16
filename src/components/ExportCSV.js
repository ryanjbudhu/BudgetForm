import React from "react";
import { Button } from "antd";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExportCSV = ({ csvData, fileName }) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (csvData, fileName) => {
        const convertedData = dataToExport(csvData);
        const ws = XLSX.utils.json_to_sheet(convertedData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    const dataToExport = (data) => {
        let arrData = [[]];
        let total = 0;
        data.forEach((pageObj) => {
            arrData.push({ pagename: pageObj.label });
            let htotal = 0;
            pageObj.items.forEach((header) => {
                let headerObj = { pagename: header.name };
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
                            Number.parseInt(child.quantity) *
                            Number.parseFloat(child.rate),
                    };
                    headerObj.quantity += Number.parseInt(child.quantity);
                    headerObj.rate += Number.parseFloat(child.rate);
                    headerObj.total += childObj.total;
                });

                if (header.children.length > 0) {
                    headerObj.rate = headerObj.rate / header.children.length;
                }
                htotal += headerObj.total;
                arrData.push(headerObj);
                // if (childObj !== undefined) arrData.push(childObj);
            });
            arrData.push({
                pagename: `Total ${pageObj.label}`,
                total: htotal.toFixed(2),
            });
            arrData.push([]);
            total += htotal;
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
