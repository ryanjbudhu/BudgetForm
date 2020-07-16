import React from "react";

import ExportCSV from "../../components/ExportCSV";
import BudgetSteps from "../../components/BudgetSteps";
import BudgetPage from "../BudgetPage";

import styles from "./Main.module.scss";
import { Layout, Col, Row } from "antd";
const { Content } = Layout;

export default function Main(props) {
    const setPageData = (pageData) => {
        const newData = [...props.data];
        newData[props.step].items = pageData;
        props.setData(newData);
    };
    return (
        <Content>
            <Row className={styles.row}>
                <Col
                    span={5}
                    pull={5}
                    style={{
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                        backgroundColor: "white",
                        top: "64px",
                        zIndex: 2,
                        minWidth: "17px",
                    }}
                >
                    <BudgetSteps onChange={props.onChange} page={props.step} />
                    <div style={{ textAlign: "center" }}>
                        <ExportCSV csvData={props.data} fileName={"Pricing and Budget"} />
                    </div>
                </Col>
                <Col span={19} push={5} style={{ textAlign: "center" }}>
                    <BudgetPage
                        pageData={props.data[props.step]}
                        step={props.step}
                        setPageData={setPageData}
                    />
                    {/* {props.step + 1 === props.data.length && ()} */}
                </Col>
            </Row>
        </Content>
    );
}
