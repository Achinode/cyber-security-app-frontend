import React, { useEffect, useState } from "react";
import { Button, List, Modal, Form, Input, message, Card, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useAuth } from "../../util/contexts/AuthContext";
import {
    adminAddAPI,
    adminDeleteAPI,
    adminGetAllAPI,
} from "../../util/api/admin.api";

interface Admin {
    _id: string;
    name: string;
    email: string;
    password: string;
}

const AdminManagementPage: React.FC = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const { user } = useAuth();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await adminGetAllAPI({ token: user?.token });
            if (res.data && res.status == "OK") {
                Array.isArray(res.data) && setAdmins(res.data);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
        getData();
    }, []);

    const handleAddAdmin = async (values: any) => {
        const newAdmin: Admin = {
            _id: (admins.length + 1).toString(),
            name: values.name,
            email: values.email,
            password: values.password,
        };
        setLoading(true);
        const res = await adminAddAPI({ ...newAdmin, token: user?.token });

        if (res && res["status"] == "OK") {
            newAdmin._id = res.data.userId;
            setAdmins([...admins, newAdmin]);
            message.success("Admin added successfully!");
            form.resetFields();
            setIsModalVisible(false);
        } else {
            message.error(res.message || "Error!");
        }
        setLoading(false);
    };

    // Function to handle deleting an admin with confirmation
    const handleDeleteAdmin = (adminId: string) => {
        Modal.confirm({
            title: "Are you sure you want to delete this admin?",
            content: "This action cannot be undone.",
            okText: "Yes, Delete",
            okType: "danger",
            cancelText: "No, Cancel",
            onOk: async () => {
                setLoading(true);
                const res = await adminDeleteAPI({
                    token: user?.token,
                    id: adminId,
                });
                if (res && res.status == "OK") {
                    const updatedAdmins = admins.filter(
                        (admin) => admin._id !== adminId
                    );
                    setAdmins(updatedAdmins);
                    message.success("Admin deleted successfully!");
                } else {
                    message.error(res.message || "Failed to delete admin.");
                }
                setLoading(false);
            },
            onCancel() {
                message.info("Admin deletion canceled.");
            },
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Admin Management</h2>

            {/* Add Admin Button */}
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Add Admin
            </Button>

            {/* Admin List */}
            {loading ? (
                <Spin tip="Loading" size="large" fullscreen></Spin>
            ) : (
                <List
                    style={{ marginTop: "20px" }}
                    dataSource={admins}
                    renderItem={(admin) => (
                        <Card key={admin._id} style={{ marginBottom: "10px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <b>Name:</b> {admin.name} <br />
                                    <b>Email:</b> {admin.email}
                                </div>
                                <Button
                                    danger
                                    type="primary"
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDeleteAdmin(admin._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    )}
                />
            )}

            {/* Modal for adding a new admin */}
            <Modal
                title="Add New Admin"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddAdmin}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the admin's name!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter admin name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Please input a valid email!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter admin email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input the admin's password!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter admin password" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Add Admin
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminManagementPage;
