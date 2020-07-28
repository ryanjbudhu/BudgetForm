import React from "react";
import styles from "./BudgetInfo.module.scss";

import { Typography, Form, DatePicker, Input, InputNumber, Radio, Col, Row } from "antd";
import moment from "moment";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const formItemLayout = {
    labelCol: { xs: 16, sm: 14, md: 12, lg: 8, xl: 6, xxl: 4 },
    wrapperCol: { span: 16 },
};
const dateFormat = "MM/DD/YYYY";
const percentFormatter = (value) => `${value}%`;

export default function BudgetInfo(props) {
    const [form] = Form.useForm();
    const save = async () => {
        const values = await form.validateFields();
        props.dispatch({ type: "info", payload: values });
    };
    return (
        <div className={styles.content}>
            <Title className={styles.pageTitle}>Information</Title>
            <Form
                form={form}
                {...formItemLayout}
                initialValues={{
                    name: props.infoData.name,
                    project: props.infoData.project,
                    division: props.infoData.division,
                    range:
                        props.infoData.start && props.infoData.end
                            ? [
                                  moment.unix(props.infoData.start),
                                  moment.unix(props.infoData.end),
                              ]
                            : null,
                    grant: props.infoData.grant,
                    contact: props.infoData.contact,
                    phone: props.infoData.phone,
                    faoff: props.infoData.faoff,
                    faon: props.infoData.faon,
                    gross: props.infoData.gross,
                }}
            >
                <Form.Item name="name" label="Vendor/Contractor Name">
                    <Input onPressEnter={save} onBlur={save} />
                </Form.Item>
                <Form.Item name="project" label="Project Name">
                    <Input onPressEnter={save} onBlur={save} />
                </Form.Item>
                <Form.Item name="division" label="Division Name">
                    <Input onPressEnter={save} onBlur={save} />
                </Form.Item>
                <Form.Item name="range" label="Project Period">
                    <RangePicker onChange={save} format={dateFormat} />
                </Form.Item>
                <Form.Item name="grant" label="Grant or Non-Grant">
                    <Radio.Group>
                        <Radio.Button value={true}>Grant</Radio.Button>
                        <Radio.Button value={false}>Non Grant</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="contact" label="Contact Name">
                    <Input onPressEnter={save} onBlur={save} />
                </Form.Item>
                <Form.Item name="phone" label="Phone Number">
                    <Input type="tel" onPressEnter={save} onBlur={save} />
                </Form.Item>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            name="faoff"
                            label="F&A Rate Off-Site"
                            labelCol={{ span: 14 }}
                        >
                            <InputNumber
                                formatter={percentFormatter}
                                onPressEnter={save}
                                onBlur={save}
                                min={0}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="faon"
                            label="F&A Rate On-Site"
                            labelCol={{ span: 14 }}
                        >
                            <InputNumber
                                formatter={percentFormatter}
                                onPressEnter={save}
                                onBlur={save}
                                min={0}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="gross"
                            label="Gross Margin"
                            labelCol={{ span: 14 }}
                        >
                            <InputNumber
                                formatter={percentFormatter}
                                onPressEnter={save}
                                onBlur={save}
                                min={0}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
