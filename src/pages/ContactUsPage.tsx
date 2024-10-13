import React from "react";
import { Layout, Row, Col, Typography, Space, Input, Button, Form } from "antd";
import {
    PhoneOutlined,
    MailOutlined,
    HomeOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import contactImage from "../assets/contact-us.jpg";
import NavBar from "../components/NavBar";

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const ContactUsPage: React.FC = () => {
    return (
        <Layout>
            <NavBar></NavBar>
            <div
                style={{
                    backgroundImage: `url(${contactImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                <Title level={1} style={{ color: "#fff" }}>
                    Contact Us
                </Title>
            </div>

            <Content style={{ padding: "50px" }}>
                <Row justify="center" gutter={[32, 32]}>
                    {/* Contact Information Section */}
                    <Col xs={24} md={12} style={{ textAlign: "center" }}>
                        <Space
                            direction="vertical"
                            size="large"
                            style={{ width: "100%" }}
                        >
                            <Space direction="vertical">
                                <HomeOutlined
                                    style={{
                                        fontSize: "40px",
                                        color: "#00152a",
                                    }}
                                />
                                <Title level={4}>Our Address</Title>
                                <Text>123 Tech Street, City, Country</Text>
                            </Space>

                            <Space direction="vertical">
                                <PhoneOutlined
                                    style={{
                                        fontSize: "40px",
                                        color: "#00152a",
                                    }}
                                />
                                <Title level={4}>Call Us</Title>
                                <Text>+1 123 456 7890</Text>
                            </Space>

                            <Space direction="vertical">
                                <MailOutlined
                                    style={{
                                        fontSize: "40px",
                                        color: "#00152a",
                                    }}
                                />
                                <Title level={4}>Email Us</Title>
                                <Text>info@company.com</Text>
                            </Space>
                        </Space>
                    </Col>

                    {/* Contact Form Section */}
                    <Col xs={24} md={12}>
                        <Title level={3} style={{ textAlign: "center" }}>
                            Send Us a Message
                        </Title>

                        <Form
                            name="contact-form"
                            layout="vertical"
                            style={{
                                maxWidth: "100%",
                                padding: "20px",
                                backgroundColor: "#f0f2f5",
                                borderRadius: "10px",
                            }}
                        >
                            <Form.Item
                                label="Your Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your name!",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter your name" />
                            </Form.Item>

                            <Form.Item
                                label="Your Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter a valid email!",
                                    },
                                ]}
                            >
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Your Message"
                                name="message"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your message!",
                                    },
                                ]}
                            >
                                <TextArea
                                    placeholder="Enter your message"
                                    rows={4}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    icon={<MessageOutlined />}
                                    htmlType="submit"
                                    block
                                    style={{ backgroundColor: "#00152a" }}
                                >
                                    Send Message
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default ContactUsPage;
