import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../util/contexts/AuthContext";

const AdminSignIn: React.FC = () => {
    const navigate = useNavigate();

    const { adminSignIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const onFinish = async (values: any) => {
        setLoading(true);
        const st = await adminSignIn(values);
        setLoading(false);
        if (st) {
            navigate("/admin/home");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <NavBar></NavBar>
            <CenteredContainer>
                <CurvedBox>
                    <Form
                        name="sign-up"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <h2 style={{ textAlign: "center" }}>Sign In</h2>

                        {/* Email */}
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
                            <Input placeholder="Enter your email" />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                            >
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                </CurvedBox>
            </CenteredContainer>
        </>
    );
};

export default AdminSignIn;

/* Styling Components */
const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;
    padding: 24px;
`;

const CurvedBox = styled.div`
    background-color: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;
