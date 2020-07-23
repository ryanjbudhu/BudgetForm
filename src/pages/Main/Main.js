import React from "react";

import ExportCSV from "../../components/ExportCSV";
import BudgetSteps from "../../components/BudgetSteps";
import BudgetPage from "../BudgetPage";

import styles from "./Main.module.scss";
import { Layout, Col, Row } from "antd";
const { Content } = Layout;

export default function Main(props) {
    return (
        <Content>
            <Row className={styles.row}>
                <Col span={5} pull={5} className={styles.col}>
                    <BudgetSteps onChange={props.onChange} page={props.step} />
                    <div style={{ textAlign: "center" }}>
                        <ExportCSV csvData={props.data} fileName={"Pricing and Budget"} />
                    </div>
                </Col>
                <Col span={19} push={5}>
                    <BudgetPage
                        pageData={props.data.pages[props.step]}
                        step={props.step}
                        dispatch={props.dispatch}
                    />
                </Col>
            </Row>
        </Content>
    );
}
