import React, { Component, useContext, useState, useEffect, useRef } from "react";
import styles from "./BudgetPage.module.scss";

import { Table, Input, InputNumber, Popconfirm, Form, Button, Typography } from "antd";
const { Title, Text } = Typography;
const { TextArea } = Input;

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

    if (editable && (!record.header || (record.edit && dataIndex === "name"))) {
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
                {inputType === "number" ? (
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
                {dataIndex === "rate"
                    ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                      }).format(Number.parseFloat(children[1]))
                    : children}
            </div>
        );
    } else if (
        record &&
        record.header &&
        record.children.length > 0 &&
        dataIndex === "rate"
    ) {
        const total = record.children
            .map((el) => Number.parseFloat(el[dataIndex]))
            .reduce((accu, curr) => accu + curr);
        childNode = (
            <Text strong>
                {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(total / record.children.length)}
            </Text>
        );
    } else if (
        record &&
        record.header &&
        record.children.length > 0 &&
        (dataIndex === "quantity" || dataIndex === "total")
    ) {
        const total = record.children
            .map((el) => Number.parseFloat(el[dataIndex]))
            .reduce((accu, curr) => accu + curr);
        childNode = <Text strong>{total}</Text>;
    } else if (record && record.header && dataIndex === "name") {
        restProps.style = { ...restProps.style, fontWeight: "600" };
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
                    if (!record.header) {
                        let total =
                            Number.parseInt(record.quantity) *
                            Number.parseFloat(record.rate);
                        if (isNaN(total)) total = 0;
                        return new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(total);
                    } else {
                        let total = record.children
                            .map((el) => {
                                if (
                                    !isNaN(Number.parseInt(el.quantity)) &&
                                    !isNaN(Number.parseFloat(el.rate))
                                ) {
                                    return (
                                        Number.parseInt(el.quantity) *
                                        Number.parseFloat(el.rate)
                                    );
                                } else return 0;
                            })
                            .reduce((acc, curr) => acc + curr, 0);
                        return (
                            <Text strong>
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(total)}
                            </Text>
                        );
                    }
                },
            },
            {
                title: "operation",
                dataIndex: "operation",
                render: (text, record) =>
                    this.props.pageData.items.length >= 1 ? (
                        <>
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
                            {record.edit !== undefined && record.edit && (
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
        if (key.length > 1)
            newPageItems[index].children = newPageItems[index].children.filter(
                (item) => item.key !== key
            );
        else newPageItems = newPageItems.filter((item) => item.key !== key);
        // this.props.setPageData(newPageItems);
        this.props.dispatch({
            type: "page",
            step: this.props.step,
            pageData: newPageItems,
        });
    };

    handleAdd = () => {
        const { pageData } = this.props;
        const count = pageData.items.length + 1;
        const newData = {
            key: String.fromCharCode(96 + count),
            name: `${pageData.label} Item ${count}`,
            quantity: null,
            rate: null,
            header: true,
            edit: true,
            childCount: 0,
            children: [],
        };
        // this.props.setPageData([...pageData.items, newData]);
        this.props.dispatch({
            type: "page",
            step: this.props.step,
            pageData: [...pageData.items, newData],
        });
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
        //this.props.setPageData(pageItems);
        this.props.dispatch({ type: "page", step: this.props.step, pageData: pageItems });
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
        // this.props.setPageData(newData);
        this.props.dispatch({ type: "page", step: this.props.step, pageData: newData });
    };

    handleComment = async () => {};

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
                    inputType: col.inputType,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div className={styles.content}>
                <Title className={styles.pageTitle}>{this.props.pageData.label}</Title>
                <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{
                        marginTop: 24,
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
                    expandable={{
                        expandRowByClick: true,
                    }}
                    pagination={{ hideOnSinglePage: true }}
                    summary={(pageData) => {
                        const subsections = pageData.map((el) =>
                            el.children
                                .map(
                                    (c) =>
                                        Number.parseInt(c.quantity) *
                                        Number.parseFloat(c.rate)
                                )
                                .reduce((acc, curr) => acc + curr, 0)
                        );
                        let total = subsections.reduce((acc, curr) => acc + curr, 0);
                        const fullFringe = this.props.info.ftfringe || 0;
                        const partFringe = this.props.info.ptfringe || 0;
                        if (pageData[0].name === "Full Time Personnel")
                            total +=
                                subsections[0] * (fullFringe / 100) +
                                subsections[1] * (partFringe / 100);
                        return (
                            <>
                                {pageData[0].name === "Full Time Personnel" && (
                                    <>
                                        <Table.Summary.Row>
                                            <Table.Summary.Cell colSpan={2}>
                                                <Text>Composite Fringes - FT</Text>
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell>
                                                {fullFringe}%
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell>
                                                <Text style={{ fontWeight: "bold" }}>
                                                    {new Intl.NumberFormat("en-US", {
                                                        style: "currency",
                                                        currency: "USD",
                                                    }).format(
                                                        subsections[0] *
                                                            (fullFringe / 100)
                                                    )}
                                                </Text>
                                            </Table.Summary.Cell>
                                        </Table.Summary.Row>
                                        <Table.Summary.Row>
                                            <Table.Summary.Cell colSpan={2}>
                                                <Text>Composite Fringes - PT</Text>
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell>
                                                {partFringe}%
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell>
                                                <Text style={{ fontWeight: "bold" }}>
                                                    {new Intl.NumberFormat("en-US", {
                                                        style: "currency",
                                                        currency: "USD",
                                                    }).format(
                                                        subsections[1] *
                                                            (partFringe / 100)
                                                    )}
                                                </Text>
                                            </Table.Summary.Cell>
                                        </Table.Summary.Row>
                                    </>
                                )}
                                <Table.Summary.Row>
                                    <Table.Summary.Cell colSpan={3}>
                                        Total
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text
                                            style={{
                                                fontWeight: "bolder",
                                            }}
                                        >
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            }).format(total)}
                                        </Text>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        );
                    }}
                />
                <Form.Item style={{ margin: "2rem" }} label="Comments">
                    <TextArea
                        value={this.props.pageData.comments}
                        onChange={(val) => {
                            this.props.dispatch({
                                type: "comment",
                                comment: val.target.value,
                                step: this.props.step,
                            });
                        }}
                    />
                </Form.Item>
            </div>
        );
    }
}
