import React from "react";
import { Steps } from "antd";
import {
    UserOutlined,
    ToolOutlined,
    UsergroupAddOutlined,
    DollarOutlined,
    BankOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import styles from "./BudgetSteps.module.scss";

const { Step } = Steps;

export default function BudgetSteps(props) {
    return (
        <Steps
            direction="vertical"
            current={props.page}
            onChange={props.onChange}
            className={styles.stepsParent}
        >
            <Step title="Information" icon={<InfoCircleOutlined />} />
            <Step title="Labor" icon={<UserOutlined />} />
            <Step title="Equiptment and Supplies" icon={<ToolOutlined />} />
            <Step title="Consultants" icon={<UsergroupAddOutlined />} />
            <Step title="Non-Personnel Expenses" icon={<DollarOutlined />} />
            <Step title="Overhead" icon={<BankOutlined />} />
        </Steps>
    );
}
