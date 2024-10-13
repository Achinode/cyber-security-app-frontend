import React, { useEffect, useState } from "react";
import {
    List,
    Button,
    Modal,
    Card,
    message,
    Tag,
    Typography,
    Spin,
} from "antd";
import { DeleteOutlined, StopOutlined } from "@ant-design/icons";
import {
    userActivateAPI,
    userDeleteAPI,
    userGetAllAPI,
} from "../../util/api/user.api";
import { useAuth } from "../../util/contexts/AuthContext";

interface User {
    _id: string;
    name: string;
    fullName: string;
    dob: string;
    email: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

const UserManagementPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalAction, setModalAction] = useState<
        "delete" | "deactivate" | null
    >(null);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await userGetAllAPI({ token: user?.token });
            if (res.data && res.status == "OK") {
                Array.isArray(res.data) && setUsers(res.data);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
        getData();
    }, []);

    // Function to confirm delete or deactivate action
    const showConfirmationModal = (
        userId: string,
        action: "delete" | "deactivate"
    ) => {
        setSelectedUserId(userId);
        setModalAction(action);
        setIsModalVisible(true);
    };

    // Function to handle user deletion
    const handleDeleteUser = async () => {
        if (users) {
            setLoading(true);
            const res = await userDeleteAPI({
                token: user?.token,
                id: selectedUserId,
            });
            if (res.status == "OK") {
                const updatedUsers = users.filter(
                    (user) => user._id !== selectedUserId
                );
                setUsers(updatedUsers);
                setIsModalVisible(false);
                message.success("User deleted successfully!");
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
    };

    // Function to handle user deactivation
    const handleDeactivateUser = async () => {
        if (users) {
            setLoading(true);
            const res = await userActivateAPI({
                token: user?.token,
                id: selectedUserId,
            });
            if (res.status == "OK") {
                const updatedUsers = users.map((user) =>
                    user._id === selectedUserId
                        ? { ...user, isActive: !user.isActive }
                        : user
                );
                setUsers(updatedUsers);
                setIsModalVisible(false);
                message.success("User activation successfully!");
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography.Title>User Management</Typography.Title>
            {loading && <Spin fullscreen size="large"></Spin>}

            <List
                dataSource={users}
                renderItem={(user) => (
                    <Card key={user._id} style={{ marginBottom: "10px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <b>{user.fullName}</b> <br />
                                <b>Email:</b> {user.email} <br />
                                <b>DOB:</b>{" "}
                                {new Date(user.dob).toLocaleDateString()} <br />
                                <Tag color={user.isActive ? "green" : "red"}>
                                    {user.isActive ? "Active" : "Inactive"}
                                </Tag>
                            </div>
                            <div>
                                <Button
                                    danger
                                    type="primary"
                                    icon={<DeleteOutlined />}
                                    style={{ marginRight: "10px" }}
                                    onClick={() =>
                                        showConfirmationModal(
                                            user._id,
                                            "delete"
                                        )
                                    }
                                >
                                    Delete
                                </Button>
                                <Button
                                    type="default"
                                    icon={<StopOutlined />}
                                    onClick={() =>
                                        showConfirmationModal(
                                            user._id,
                                            "deactivate"
                                        )
                                    }
                                >
                                    {user.isActive ? "Deactivate" : "Activate"}
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}
            />

            {/* Modal for delete/deactivate confirmation */}
            <Modal
                title={
                    modalAction === "delete"
                        ? "Confirm Delete User"
                        : "Confirm Deactivate/Activate User"
                }
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={
                    modalAction === "delete"
                        ? handleDeleteUser
                        : handleDeactivateUser
                }
                okText={modalAction === "delete" ? "Delete" : "Deactivate"}
                okButtonProps={{
                    danger: modalAction === "delete",
                }}
            >
                <p>
                    Are you sure you want to{" "}
                    {modalAction === "delete" ? "delete" : "deactivate"} this
                    user?
                </p>
            </Modal>
        </div>
    );
};

export default UserManagementPage;
