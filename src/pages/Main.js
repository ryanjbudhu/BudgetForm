import React from "react";

import ExportCSV from "../components/ExportCSV";
import BudgetSteps from "../components/BudgetSteps";
import BudgetPage from "./BudgetPage";

export default function Main(props) {
    return (
        <>
            <ExportCSV />
            <BudgetSteps onChange={props.onChange} page={props.step} />
            <BudgetPage data={props.data} step={props.step} onChange={props.setData} />
        </>
    );
}
