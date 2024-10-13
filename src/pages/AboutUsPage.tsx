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
                                We are a passionate team dedicated to making a
                                difference in the world through innovative
                                solutions. Our mission is to empower businesses
                                and individuals with cutting-edge technology to
                                meet their needs and achieve their goals. At the
                                heart of our company, we value collaboration,
                                creativity, and commitment to excellence.
                            </Paragraph>

                            <Title level={3} style={{ marginTop: "40px" }}>
                                Our Vision
                            </Title>
                            <Paragraph
                                style={{ fontSize: "18px", lineHeight: 1.8 }}
                            >
                                We believe in building a better future where
                                technology works for people, improving lives,
                                and fostering meaningful connections. Our vision
                                is to continually evolve, bringing together the
                                best talents and technologies to create
                                impactful solutions for everyone.
                            </Paragraph>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
};

export default AboutUsPage;
