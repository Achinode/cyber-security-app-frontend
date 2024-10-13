import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    DatePicker,
    Modal,
    Avatar,
    message,
    Typography,
    Spin,
} from "antd";
import moment from "moment";
import { styled } from "styled-components";
import { useAuth } from "../../util/contexts/AuthContext";
import {
    userGetOneAPI,
    userPasswordChange,
    userUpdateOneAPI,
} from "../../util/api/user.api";
import { getAvatarLetter } from "../../util/helpers/stringFormatter";

const StudentProfile: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // const [resUser, setResUser] = useState<any>({});
    const { user, signOut } = useAuth();

    useEffect(() => {
        async function getUserData() {
            setLoading(true);
            const res = await userGetOneAPI({ token: user?.token });
            if (res.data && res.status == "OK") {
                // res.data && setResUser(res.data);
                form.setFieldsValue({
                    fullName: res.data.fullName,
                    dob: moment(res.data.dob, "YYYY-MM-DD"),
                    email: res.data.email,
                });
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
        getUserData();
    }, []);

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setLoading(true);
        const res = await userUpdateOneAPI({ ...values, token: user?.token });
        if (res) {
            message.success("Update Successfully!");
        } else {
            message.error(res.message);
        }
        setLoading(false);
    };

    const showPasswordModal = () => {
        setIsModalVisible(true);
    };

    const handlePasswordChange = async (values: any) => {
        setLoading(true);
        const res = await userPasswordChange({ ...values, token: user?.token });
        setLoading(false);
        if (res) {
            message.success("Password Change Successfully!");
            setIsModalVisible(false); // Close the modal
            setTimeout(() => {
                signOut();
            }, 2000);
        } else {
            message.error(res.message);
        }
    };

    return (
        <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
            {loading && <Spin size="large" fullscreen></Spin>}

            <Typography.Title>Profile</Typography.Title>
            <CenteredContainer>
                <Avatar size={72}> {getAvatarLetter(user?.fullName)}</Avatar>
            </CenteredContainer>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                {/* Full Name */}
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: "Please input your full name!",
                        },
                    ]}
                >
                    <Input placeholder="Enter your full name" />
                </Form.Item>

                {/* Full Name */}
                <Form.Item label="Email" name="email">
                    <Input placeholder="Enter your email" readOnly disabled />
                </Form.Item>

                {/* Date of Birth */}
                <Form.Item
                    label="Date of Birth"
                    name="dob"
                    rules={[
                        {
                            required: true,
                            message: "Please select your date of birth!",
                        },
                    ]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                {/* Save Profile Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Save Profile
                    </Button>
                </Form.Item>
            </Form>

            {/* Change Password Button */}
            <Button type="default" onClick={showPasswordModal} block>
                Change Password
            </Button>

            {/* Change Password Modal */}
            <Modal
                title="Change Password"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form layout="vertical" onFinish={handlePasswordChange}>
                    {/* Current Password */}
                    <Form.Item
                        label="Current Password"
                        name="currentPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your current password!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter current password" />
                    </Form.Item>

                    {/* New Password */}
                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your new password!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter new password" />
                    </Form.Item>

                    {/* Confirm New Password */}
                    <Form.Item
                        label="Confirm New Password"
                        name="confirmNewPassword"
                        dependencies={["newPassword"]}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your new password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("newPassword") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The two passwords do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Re-enter new password" />
                    </Form.Item>

                    {/* Submit Password Change */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default StudentProfile;

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
