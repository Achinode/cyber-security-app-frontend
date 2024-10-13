import React from "react";
import { Layout, Typography, Row, Col } from "antd";
import aboutImage from "../assets/about-us.jpg";
import NavBar from "../components/NavBar";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AboutUsPage: React.FC = () => {
    return (
        <>
            <NavBar></NavBar>
            <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
                <Content style={{ padding: "50px" }}>
                    <Row justify="center">
                        <Col span={16} style={{ textAlign: "center" }}>
                            <img
                                src={aboutImage}
                                alt="About Us"
                                style={{
                                    width: "100%",
                                    maxHeight: "400px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                            />
                        </Col>
                    </Row>

                    <Row justify="center" style={{ marginTop: "50px" }}>
                        <Col span={16} style={{ textAlign: "center" }}>
                            <Title level={2}>Who We Are</Title>
                            <Paragraph
                                style={{ fontSize: "18px", lineHeight: 1.8 }}
                            >
                                At Provide.lk, we are committed to fostering a 
                                culture of cybersecurity awareness among our 
                                employees. Our mission is to equip everyone 
                                with the knowledge and tools they need to 
                                recognize and combat potential security threats.
                                Through this platform, we provide engaging and interactive content, 
                                including quizzes and resources, to help employees 
                                stay informed about the latest security best practices. 
                                From identifying phishing attacks to ensuring password security, 
                                our goal is to create a secure working environment for everyone. 
                                Together, we can protect our organization and its valuable 
                                data from cyber threats.
                            </Paragraph>

                            <Title level={3} style={{ marginTop: "40px" }}>
                                Our Vision
                            </Title>
                            <Paragraph
                                style={{ fontSize: "18px", lineHeight: 1.8 }}
                            >
                                Our vision is to cultivate a workforce that is 
                                well-versed in cybersecurity, making security 
                                awareness a natural part of our everyday operations.
                                We aim to empower every employee with the knowledge 
                                and skills to identify, prevent, and respond to 
                                potential cyber threats, creating a resilient and 
                                secure workplace. By fostering continuous learning 
                                and proactive engagement with security practices, 
                                we aspire to build a company culture where everyone 
                                plays a key role in safeguarding our digital environment.
                            </Paragraph>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
};

export default AboutUsPage;
