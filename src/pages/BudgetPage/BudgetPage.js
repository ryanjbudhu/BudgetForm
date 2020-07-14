import React, { useState } from "react";
import styles from "./BudgetPage.module.scss";

import { Table, Input, InputNumber, Popconfirm, Form, Button } from "antd";

const capitalize = (tocap) => tocap.charAt(0).toUpperCase() + tocap.slice(1);

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default function BudgetPage(props) {
    console.log(props.data[props.step]);

    let newObj = props.data[props.step].items[0];
    const columnNames = Object.keys(newObj).filter(
        (key) => key !== "key" && key !== "children"
    );
    let columns = columnNames.map((key) => ({
        title: capitalize(key),
        dataIndex: key,
        inputType: key === "name" ? "text" : "number",
        key: key,
    }));

    const [form] = Form.useForm();
    // const [data, setData] = useState(props);
    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record) => record.key === editingKey;

    let columnFieldsValues = {};
    columnNames.forEach((name) => (columnFieldsValues[name] = ""));

    const edit = (record) => {
        form.setFieldsValue({
            columnFieldsValues,
            ...record,
        });
        console.log(columnFieldsValues);
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...props.data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                props.setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                props.setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    columns.push({
        title: "operation",
        dataIndex: "operation",
        render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
                <span>
                    <Button
                        type="primary"
                        onClick={() => save(record.key)}
                        style={{
                            marginRight: 8,
                        }}
                    >
                        Save
                    </Button>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                        <Button type="link">Cancel</Button>
                    </Popconfirm>
                </span>
            ) : (
                <Button
                    type="link"
                    disabled={editingKey !== ""}
                    onClick={() => edit(record)}
                >
                    Edit
                </Button>
            );
        },
    });
    console.log(columns);
    return (
        <div className={styles.content}>
            <h1>{props.data[props.step].label}</h1>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={props.data[props.step].items}
                    columns={columns}
                    summary={(items) => {
                        let total = 0;
                        items.forEach((item) => {});
                    }}
                ></Table>
            </Form>
        </div>
    );
}
