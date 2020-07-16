import React from "react";
import { Button } from "antd";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExportCSV = ({ csvData, fileName }) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (csvData, fileName) => {
        console.log([...csvData]);
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        // FileSaver.saveAs(data, fileName + fileExtension);
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
