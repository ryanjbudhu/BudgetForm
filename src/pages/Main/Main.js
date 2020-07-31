import React from "react";

import ExportCSV from "../../components/ExportCSV";
import BudgetSteps from "../../components/BudgetSteps";
import BudgetPage from "../BudgetPage";
import BudgetInfo from "../BudgetInfo";

import styles from "./Main.module.scss";
import { Layout, Col, Row, Button, Space, Popconfirm, Input, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Content } = Layout;

export default function Main(props) {
    const uploadProps = {
        style: {
            position: "absolute",
            zIndex: "-1",
            opacity: "0",
        },
        onChange(event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                // The file's text will be printed here
                try {
                    const newData = JSON.parse(e.target.result);
                    if (!newData.info || !newData.pages) {
                        throw new Error("Must be properly formatted JSON.");
                    }
                    props.dispatch({ type: "upload", jsonData: newData });
                } catch (e) {
                    message.error(e.message);
                    console.error(e);
                }
            };
            reader.readAsText(file);
        },
    };
    return (
        <Content>
            <Row className={styles.row}>
                <Col span={5} pull={5} className={styles.col}>
                    <BudgetSteps onChange={props.onChange} page={props.step} />
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <Space align="center" style={{ marginBottom: "1rem" }}>
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
                        <div style={{ display: "block" }}>
                            <label htmlFor="uploadJSON">
                                <div class="ant-btn">
                                    <UploadOutlined /> Upload JSON
                                </div>
                            </label>
                            <Input type="file" id="uploadJSON" {...uploadProps} />
                        </div>
                    </div>
                </Col>
                <Col span={19} push={5}>
                    {props.step === 0 ? (
                        <BudgetInfo
                            dispatch={props.dispatch}
                            infoData={props.data.info}
                            form={props.form}
                        />
                    ) : (
                        <BudgetPage
                            pageData={props.data.pages[props.step - 1]}
                            info={props.data.info}
                            step={props.step - 1}
                            dispatch={props.dispatch}
                        />
                    )}
                </Col>
            </Row>
        </Content>
    );
}
