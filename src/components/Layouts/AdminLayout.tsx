import {
    FileAddOutlined,
    FileOutlined,
    FileWordOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import AdminPrivateRoute from "../../util/contexts/AdminPrivateRoute";

const { Content, Sider } = Layout;

const items2: MenuProps["items"] = [
    {
        key: 1,
        icon: <HomeOutlined></HomeOutlined>,
        label: <Link to="/admin/home">Home</Link>,
    },
    {
        key: 2,
        icon: <HomeOutlined></HomeOutlined>,
        label: <Link to="/admin/user-management">User Management</Link>,
    },
    {
        key: 3,
        icon: <FileOutlined></FileOutlined>,
        label: <Link to="/admin/add-content">Add Content</Link>,
    },
    {
        key: 4,
        icon: <FileOutlined></FileOutlined>,
        label: <Link to="/admin/add-quiz">Add Quiz</Link>,
    },
    {
        key: 5,
        icon: <FileWordOutlined></FileWordOutlined>,
        label: <Link to="/admin/view-contents">View Contents</Link>,
    },
    {
        key: 6,
        icon: <FileAddOutlined></FileAddOutlined>,
        label: <Link to="/admin/view-quizzes">View Quizzes</Link>,
    },
];

const AdminLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <AdminPrivateRoute>
            <Layout style={{ minHeight: "100vh" }}>
                <AdminHeader></AdminHeader>
                <Layout>
                    <Sider width={200} style={{ background: colorBgContainer }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            style={{ height: "100%", borderRight: 0 }}
                            items={items2}
                        />
                    </Sider>
                    <Layout style={{ padding: "0 24px 24px" }}>
                        <Breadcrumb
                            items={[{ title: "Home" }]}
                            style={{ margin: "16px 0" }}
                        />
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </AdminPrivateRoute>
    );
};

export default AdminLayout;
