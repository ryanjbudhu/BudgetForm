import React from "react";

import ExportCSV from "../../components/ExportCSV";
import BudgetSteps from "../../components/BudgetSteps";
import BudgetPage from "../BudgetPage";
import BudgetInfo from "../BudgetInfo";

import styles from "./Main.module.scss";
import { Layout, Col, Row, Button, Space, Popconfirm } from "antd";
const { Content } = Layout;

export default function Main(props) {
    return (
        <Content>
            <Row className={styles.row}>
                <Col span={5} pull={5} className={styles.col}>
                    <BudgetSteps onChange={props.onChange} page={props.step} />
                    <div style={{ textAlign: "center" }}>
                        <Space align="center" style={{ marginBottom: "3rem" }}>
                            <ExportCSV
                                csvData={props.data}
                                fileName={"Pricing and Budget"}
                            />
                            <Popconfirm
                                title="Sure to reset?"
                                onConfirm={() => props.dispatch({ type: "reset" })}
                            >
                                <Button type="ghost">Reset</Button>
                            </Popconfirm>
                        </Space>
                    </div>
                </Col>
                <Col span={19} push={5}>
                    {props.step === 0 ? (
                        <BudgetInfo
                            dispatch={props.dispatch}
                            infoData={props.data.info}
                        />
                    ) : (
                        <BudgetPage
                            pageData={props.data.pages[props.step - 1]}
                            step={props.step}
                            dispatch={props.dispatch}
                        />
                    )}
                </Col>
            </Row>
        </Content>
    );
}
