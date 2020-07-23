import React, { useState, useEffect, useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";

import Main from "./pages/Main";
import { Layout } from "antd";
const { Header } = Layout;

let defaultData = require("./utils/default.json");

function reducer(state, action) {
    switch (action.type) {
        case "page": // action = {step, pageData}
            const newData = [...state.pages];
            newData[action.step].items = action.pageData;
            return { ...state, pages: newData };
        case "info": // action = {dataItem, infoData}
            return {
                ...state,
                info: { ...state.info, [action.dataItem]: action.infoData },
            };
        default:
            throw new Error("Action of unknown type.");
    }
}

// TODO: change to useReducer and create reducer function
function App() {
    const [step, setStep] = useState(0);
    const onChange = (current) => setStep(current);
    const localState = JSON.parse(localStorage.getItem("VLProjectBudget")) || defaultData;
    const [data, dispatch] = useReducer(reducer, localState || defaultData);
    useEffect(() => {
        localStorage.setItem("VLProjectBudget", JSON.stringify(data));
    }, [data]);

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
                <Main step={step} data={data} dispatch={dispatch} onChange={onChange} />
            </Layout>
        </Layout>
    );
}

export default App;
