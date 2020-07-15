import React, { Component, useContext, useState, useEffect, useRef } from "react";
import styles from "./BudgetPage.module.scss";

import { Table, Input, InputNumber, Popconfirm, Form, Button } from "antd";

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
        this.columns.push({
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
        });
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
            console.log(newData[hIndex]);
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
                <h1>{this.props.pageData.label}</h1>
                <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                    ref={this.addWrapper}
                >
                    Add a row
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

// export default function BudgetPage(props) {
//     console.log(props.data[props.step]);

//     const [form] = Form.useForm();
//     // const [data, setData] = useState(props);
//     const [editingKey, setEditingKey] = useState("");

//     const isEditing = (record) => record.key === editingKey;

//     let columnFieldsValues = {};
//     columnNames.forEach((name) => (columnFieldsValues[name] = ""));

//     const edit = (record) => {
//         form.setFieldsValue({
//             columnFieldsValues,
//             ...record,
//         });
//         setEditingKey(record.key);
//     };

//     const cancel = () => {
//         setEditingKey("");
//     };

//     const save = async (key) => {
//         try {
//             const row = await form.validateFields();
//             const newData = [...props.data[props.step]];
//             const index = newData.findIndex((item) => key === item.key);

//             if (index > -1) {
//                 const item = newData[index];
//                 newData.splice(index, 1, { ...item, ...row });
//                 props.setData(newData);
//                 setEditingKey("");
//             } else {
//                 newData.push(row);
//                 props.setData(newData);
//                 setEditingKey("");
//             }
//         } catch (errInfo) {
//             console.log("Validate Failed:", errInfo);
//         }
//     };

//     columns.push({
//         title: "operation",
//         dataIndex: "operation",
//         render: (_, record) => {
//             const editable = isEditing(record);
//             return editable ? (
//                 <span>
//                     <Button
//                         type="primary"
//                         onClick={() => save(record.key)}
//                         style={{
//                             marginRight: 8,
//                         }}
//                     >
//                         Save
//                     </Button>
//                     <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//                         <Button type="link">Cancel</Button>
//                     </Popconfirm>
//                 </span>
//             ) : (
//                 <Button
//                     type="link"
//                     disabled={editingKey !== ""}
//                     onClick={() => edit(record)}
//                 >
//                     Edit
//                 </Button>
//             );
//         },
//     });
//     console.log(columns);
//     return (
//         <div className={styles.content}>
//             <h1>{props.data[props.step].label}</h1>
//             <Form form={form} component={false}>
//                 <Table
//                     components={{
//                         body: {
//                             cell: EditableCell,
//                         },
//                     }}
//                     bordered
//                     dataSource={props.data[props.step].items}
//                     columns={columns}
//                     summary={(items) => {
//                         let total = 0;
//                         items.forEach((item) => {});
//                     }}
//                 ></Table>
//             </Form>
//         </div>
//     );
// }
