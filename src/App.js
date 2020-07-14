import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import Main from "./pages/Main";
let defaultData = require("./utils/default.json");

const useSessionState = (storageKey) => {
    const [data, setData] = useState(
        JSON.parse(sessionStorage.getItem(storageKey)) || defaultData
    );
    useEffect(() => {
        const stringData = JSON.stringify(data);
        sessionStorage.setItem(storageKey, stringData);
    }, [data, storageKey]);
    return [data, setData];
};

function App() {
    const [step, setStep] = useState(0);
    const onChange = (current) => setStep(current);
    const [data, setData] = useSessionState("VLProjectBudget");
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <Main step={step} data={data} setData={setData} onChange={onChange} />
        </div>
    );
}

export default App;
