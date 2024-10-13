import { FileOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import StudentHeader from "../../components/StudentHeader";
import { Link, Outlet } from "react-router-dom";
import StudentPrivateRoute from "../../util/contexts/StudentPrivateRoute";

const { Content, Sider } = Layout;

const items2: MenuProps["items"] = [
    {
        key: 1,
        icon: <HomeOutlined></HomeOutlined>,
        label: <Link to="/student/home">Home</Link>,
    },
    {
        key: 2,
        icon: <FileOutlined></FileOutlined>,
        label: <Link to="/student/course">My Courses</Link>,
    },
];

const StudentLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <StudentPrivateRoute>
            <Layout style={{ minHeight: "100vh" }}>
                <StudentHeader></StudentHeader>
                <Layout>
                    <Sider width={200} style={{ background: colorBgContainer }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            defaultOpenKeys={["sub1"]}
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
        </StudentPrivateRoute>
    );
};

export default StudentLayout;
