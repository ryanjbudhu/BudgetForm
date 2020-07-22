import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import Main from "./pages/Main";
import { Layout } from "antd";
const { Header } = Layout;

let defaultData = require("./utils/default.json");
let defaultInfo = require("./utils/info.json");
const useSessionState = (storageKey, empty) => {
    const [data, setData] = useState(
        JSON.parse(localStorage.getItem(storageKey)) || empty
    );
    useEffect(() => {
        const stringData = JSON.stringify(data);
        localStorage.setItem(storageKey, stringData);
    }, [data, storageKey]);
    return [data, setData];
};

// TODO: change to useReducer and create reducer function
function App() {
    const [step, setStep] = useState(0);
    const onChange = (current) => setStep(current);
    const [data, setData] = useSessionState("VLProjectBudget", defaultData);
    const setPageData = (pageData) => {
        const newData = [...data];
        newData[step].items = pageData;
        setData(newData);
    };
    const [info, setInfo] = useSessionState("VLProjectBudgetInfo", defaultInfo);

    return (
        <Layout>
            <Header
                style={{
                    position: "fixed",
                    zIndex: 2,
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <img src={logo} className="App-logo" alt="logo" />
            </Header>
            <Layout>
                <Main
                    step={step}
                    data={data}
                    setPageData={setPageData}
                    onChange={onChange}
                />
            </Layout>
        </Layout>
    );
}

export default App;
