import React from "react";
import styles from "./BudgetInfo.module.scss";

import { Typography, Form, DatePicker, Input, Radio } from "antd";
import moment from "moment";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const formItemLayout = {
    labelCol: { xs: 16, sm: 14, md: 12, lg: 8, xl: 6, xxl: 4 },
    wrapperCol: { span: 16 },
};
const dateFormat = "MM/DD/YYYY";

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
                            ? [moment(props.infoData.start), moment(props.infoData.end)]
                            : null,
                    grant: props.infoData.grant,
                    contact: props.infoData.contact,
                    phone: props.infoData.phone,
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
                    <Input onPressEnter={save} onBlur={save} />
                </Form.Item>
            </Form>
        </div>
    );
}
