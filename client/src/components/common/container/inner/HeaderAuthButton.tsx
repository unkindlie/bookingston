import { UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";

// TODO: add modals for login and register
const items: MenuProps["items"] = [
    {
        key: 1,
        label: "Login",
    },
    {
        key: 2,
        label: "Register",
    },
];

const HeaderAuthDropdown = () => {
    return (
        <Dropdown trigger={["click"]} menu={{ items }} placement="topRight">
            <UserOutlined style={{ fontSize: 24 }} />
        </Dropdown>
    );
};

export { HeaderAuthDropdown };
