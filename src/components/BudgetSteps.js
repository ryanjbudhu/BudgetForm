import React from "react";
import { Steps } from "antd";
import {
    UserOutlined,
    ToolOutlined,
    UsergroupAddOutlined,
    DollarOutlined,
    BankOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

export default function BudgetSteps(props) {
    return (
        <Steps direction="vertical" current={props.page} onChange={props.onChange}>
            <Step title="Labor" icon={<UserOutlined />} />
            <Step title="Equiptment and Supplies" icon={<ToolOutlined />} />
            <Step title="Consultants" icon={<UsergroupAddOutlined />} />
            <Step title="Non-Personnel Expenses" icon={<DollarOutlined />} />
            <Step title="Overhead" icon={<BankOutlined />} />
        </Steps>
    );
}
