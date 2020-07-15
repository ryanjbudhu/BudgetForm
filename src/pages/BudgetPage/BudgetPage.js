import React, { Component, useContext, useState, useEffect, useRef } from "react";
import styles from "./BudgetPage.module.scss";

import { Table, Input, InputNumber, Popconfirm, Form, Button, Typography } from "antd";
const { Title } = Typography;

const capitalize = (tocap) => tocap.charAt(0).toUpperCase() + tocap.slice(1);

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    inputType,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async (e) => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                {inputRef === "number" ? (
                    <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
                ) : (
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                )}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

export default class BudgetPage extends Component {
    constructor(props) {
        super(props);
        this.addWrapper = React.createRef();

        let newObj = this.props.pageData.items[0];
        const columnNames = Object.keys(newObj).filter(
            (key) =>
                key !== "key" &&
                key !== "children" &&
                key !== "header" &&
                key !== "childCount"
        );
        this.columns = columnNames.map((key) => ({
            title: capitalize(key),
            dataIndex: key,
            inputType: key === "name" ? "text" : "number",
            editable: true,
            key: key,
        }));
        this.columns.push(
            {
                title: "Total",
                dataIndex: "total",
                render: (text, record) => {
                    let total =
                        Number.parseInt(record.quantity) * Number.parseFloat(record.rate);
                    if (isNaN(total)) total = 0;
                    return `$${total.toFixed(2)}`;
                },
            },
            {
                title: "operation",
                dataIndex: "operation",
                render: (text, record) =>
                    this.props.pageData.items.length >= 1 ? (
                        <>
                            {record.children !== undefined && !record.header && (
                                <Button
                                    type="link"
                                    onClick={() => this.handleAddChild(record.key)}
                                >
                                    Add
                                </Button>
                            )}
                            {record.header ? (
                                <Button
                                    type="link"
                                    onClick={() => this.handleAddChild(record.key)}
                                >
                                    Add
                                </Button>
                            ) : (
                                <Popconfirm
                                    title="Sure to delete?"
                                    onConfirm={() => this.handleDelete(record.key)}
                                >
                                    <Button type="link">Delete</Button>
                                </Popconfirm>
                            )}
                        </>
                    ) : null,
            }
        );
    }

    // Only drawback is that you can only have at most 26 main sections per page
    // keys are: section is [a-z] and subsection is matching [a-z] with [0-9]+ appended
    handleDelete = (key) => {
        let newPageItems = this.props.pageData.items;
        const index = newPageItems.findIndex((item) => item.key === key.charAt(0));
        if (!newPageItems[index].header && key.length > 1)
            newPageItems[index].children = newPageItems[index].children.filter(
                (item) => item.key !== key
            );
        else newPageItems = newPageItems.filter((item) => item.key !== key);
        this.props.setPageData(newPageItems);
    };

    handleAdd = () => {
        const { pageData } = this.props;
        const count = pageData.items.length + 1;
        const newData = {
            key: String.fromCharCode(96 + count),
            name: `${pageData.label} Item ${count}`,
            quantity: null,
            rate: null,
            header: false,
            childCount: 0,
            children: [],
        };
        this.props.setPageData([...pageData.items, newData]);
    };

    handleAddChild = (key) => {
        const pageItems = this.props.pageData.items;
        const index = pageItems.findIndex((item) => item.key === key);
        if (index < 0) {
            return;
        }
        const count = pageItems[index].childCount + 1;
        pageItems[index].childCount = count;
        pageItems[index].children.push({
            key: key + count,
            name: `Item ${count}`,
            quantity: 0,
            rate: 0,
            header: false,
        });
        this.props.setPageData(pageItems);
    };

    handleSave = (row) => {
        const newData = [...this.props.pageData.items];
        const hIndex = newData.findIndex((item) => row.key.charAt(0) === item.key);
        const item = newData[hIndex];
        if (row.header === undefined || !row.header) {
            const cIndex = newData[hIndex].children.findIndex(
                (item) => row.key === item.key
            );
            const child = newData[hIndex].children[cIndex];
            newData[hIndex].children.splice(cIndex, 1, {
                ...child,
                ...row,
            });
        } else {
            newData.splice(hIndex, 1, { ...item, ...row });
        }
        this.props.setPageData(newData);
    };

    render() {
        const { pageData } = this.props;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div className={styles.content}>
                <Title>{this.props.pageData.label}</Title>
                <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                    ref={this.addWrapper}
                >
                    Add a Section
                </Button>
                <Table
                    components={components}
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={pageData.items}
                    columns={columns}
                />
            </div>
        );
    }
}
