import React from "react";
import { Layout, Menu, Dropdown, Avatar, Space, MenuProps } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../util/contexts/AuthContext";

const { Header } = Layout;

const items: MenuProps["items"] = [
    // {
    //     label: <Link to={"/student/profile"}>Profile</Link>,
    //     key: "1",
    //     icon: <UserOutlined />,
    // },
    {
        label: "Logout",
        key: "2",
        icon: <LogoutOutlined />,
        danger: true,
    },
];

const items1: MenuProps["items"] = [
    {
        key: 1,
        label: <Link to={"/"}>Home</Link>,
    },
    {
        key: 2,
        label: <Link to={"/about"}>About</Link>,
    },
    {
        key: 3,
        label: <Link to={"/contact"}>Contact</Link>,
    },
];

const AdminHeader: React.FC = () => {
    const { signOut } = useAuth();

    const handleMenuClick: MenuProps["onClick"] = (e) => {
        if (e.key == "2") {
            signOut();
        }
    };
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (
        <Header style={{ display: "flex", alignItems: "center" }}>
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["home"]}
                items={items1}
                style={{ flex: 1, minWidth: 0 }}
            />

            {/* Profile Avatar with Dropdown Menu */}
            <Dropdown menu={menuProps} placement="bottomRight">
                <Space style={{ cursor: "pointer" }}>
                    <Avatar
                        size="large"
                        icon={<UserOutlined style={{ color: "#00152a" }} />}
                        shape="circle"
                        style={{ backgroundColor: "white" }}
                    />
                </Space>
            </Dropdown>
        </Header>
    );
};

export default AdminHeader;
