import React from "react";

export default function BudgetPage(props) {
    console.log(props);
    return <div>This is page {props.step + 1}.</div>;
}
