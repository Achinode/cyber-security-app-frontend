import React, { useState } from "react";
import { Form, Input, Button, Checkbox, DatePicker, message } from "antd";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { userSignUpAPI } from "../../util/api/user.api";

const SignUpPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        setLoading(true);
        const res = await userSignUpAPI(values);
        if (res) {
            if (res.status == "ERROR") {
                message.error(res.message);
                return false;
            } else {
                message.success({
                    content:
                        "Account Created!\nYou will redirect to the login page in 3s.",
                    duration: 1500,
                });
                setTimeout(() => {
                    navigate("/sign-in");
                }, 3000);
            }
        }
        setLoading(false);
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
                        <h2 style={{ textAlign: "center" }}>Sign Up</h2>

                        {/* Name */}
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your name!",
                                },
                            ]}
                        >
                            <Input placeholder="Enter your name" />
                        </Form.Item>

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

                        {/* Date of Birth */}
                        <Form.Item
                            label="Date of Birth"
                            name="dob"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please select your date of birth!",
                                },
                            ]}
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please confirm your password with minimum 8 characters",
                                    min: 8,
                                },
                            ]}
                        >
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>

                        {/* Re-enter Password */}
                        <Form.Item
                            label="Re-enter Password"
                            name="confirmPassword"
                            dependencies={["password"]}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("password") === value
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
                            <Input.Password placeholder="Re-enter your password" />
                        </Form.Item>

                        {/* Privacy Policy Agreement */}
                        <Form.Item
                            name="privacy"
                            valuePropName="checked"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please agree to the privacy policy!",
                                },
                            ]}
                        >
                            <Checkbox>
                                I agree to the{" "}
                                <Link to="/privacy-policy">Privacy Policy</Link>
                            </Checkbox>
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                            >
                                Sign Up
                            </Button>
                        </Form.Item>

                        {/* Already have an account link */}
                        <Form.Item>
                            <AlreadyAccountText>
                                Already have an account?{" "}
                                <Link to="/sign-in">Log in here</Link>
                            </AlreadyAccountText>
                        </Form.Item>
                    </Form>
                </CurvedBox>
            </CenteredContainer>
        </>
    );
};

export default SignUpPage;

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

const AlreadyAccountText = styled.div`
    text-align: center;
    margin-top: 10px;
`;
