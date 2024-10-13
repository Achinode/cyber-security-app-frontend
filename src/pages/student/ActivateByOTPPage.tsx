import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Input, Button, message } from "antd";
import {
    userActivateEmailAPI,
    userValidateOTPAPI,
} from "../../util/api/user.api";
import { useAuth } from "../../util/contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const { Title, Text } = Typography;
const { Content } = Layout;

const ActivateByOTPPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [firstLoading, setFirstLoading] = useState(true);

    const [otp, setOtp] = useState<string>("");
    const [timer, setTimer] = useState<number>(30); // Countdown timer for OTP resend
    const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
    const { user } = useAuth();
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();

    // Start countdown when the component mounts
    useEffect(() => {
        if (isResendDisabled) {
            setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer > 0) return prevTimer - 1;
                    else {
                        setIsResendDisabled(false);
                        return 0;
                    }
                });
            }, 1000);
        }
    }, [isResendDisabled]);

    useEffect(() => {
        if (!firstLoading) {
            sendOTP();
        }
        setFirstLoading(false);
    }, [firstLoading]);

    // Function to handle OTP submission
    const handleOtpSubmit = async () => {
        setLoading(true);
        const res = await userValidateOTPAPI({
            token: user?.token,
            userId,
            OTP: otp,
        });
        if (res.status == "OK") {
            message.success(res.message);
            setTimeout(() => {
                navigate("/sign-in");
            }, 1500);
        } else {
            message.error(res.message);
        }
        setLoading(false);
    };

    const sendOTP = async () => {
        setLoading(true);
        const res = await userActivateEmailAPI({
            token: user?.token,
            id: userId,
        });
        if (res.status == "OK") {
            message.success(res.message || "Success");
        } else {
            message.error(res.message || "Error");
        }
        setLoading(false);
    };

    // Function to handle OTP resend
    const handleResendOtp = () => {
        if (!isResendDisabled) {
            sendOTP();
        }
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
                padding: "50px",
                backgroundColor: "#f0f2f5",
            }}
        >
            <Content>
                <Row justify="center" align="middle" style={{ height: "100%" }}>
                    <Col xs={24} md={12}>
                        <div
                            style={{
                                textAlign: "center",
                                padding: "20px",
                                backgroundColor: "#fff",
                                borderRadius: "10px",
                            }}
                        >
                            <Title level={2}>OTP Verification</Title>
                            <Text>
                                Enter the 6-digit OTP sent to your email
                            </Text>

                            <Input
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                style={{
                                    marginTop: "20px",
                                    textAlign: "center",
                                    fontSize: "18px",
                                }}
                            />

                            <Button
                                type="primary"
                                onClick={handleOtpSubmit}
                                block
                                style={{ marginTop: "20px" }}
                                loading={loading}
                            >
                                Verify OTP
                            </Button>

                            <div style={{ marginTop: "20px" }}>
                                {isResendDisabled ? (
                                    <Text type="secondary">
                                        Resend OTP available in <b>{timer}</b>{" "}
                                        seconds
                                    </Text>
                                ) : (
                                    <Button
                                        type="link"
                                        onClick={handleResendOtp}
                                    >
                                        Resend Activation
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default ActivateByOTPPage;
