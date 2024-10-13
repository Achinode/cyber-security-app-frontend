import React from "react";
import { Layout, Carousel, Row, Col, Image } from "antd";

import styled from "styled-components";
import NavBar from "../components/NavBar";

const { Footer, Content } = Layout;

const sliderImages = [
    { id: 1, src: "https://via.placeholder.com/1200x400?text=Slide+1" },
    { id: 2, src: "https://via.placeholder.com/1200x400?text=Slide+2" },
    { id: 3, src: "https://via.placeholder.com/1200x400?text=Slide+3" },
];

const HomePage: React.FC = () => {
    return (
        <Layout>
            {/* Navigation Bar */}
            <NavBar></NavBar>

            {/* Main Landing Section */}
            <Content style={{ minHeight: "80vh", padding: "50px" }}>
                <Row gutter={16} justify="center" align="middle">
                    <Col span={12}>
                        <div>
                            <h1>Welcome to Our Landing Page</h1>
                            <p>
                                Our product helps you solve problems in the best
                                way possible. Discover more below.
                            </p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <Image
                            src="https://via.placeholder.com/500x500?text=Landing+Image"
                            alt="Landing Image"
                            preview={false}
                            style={{ borderRadius: "8px" }}
                        />
                    </Col>
                </Row>
            </Content>

            {/* Bottom Slider with Images */}
            <StyledSlider>
                <Carousel autoplay>
                    {sliderImages.map((item) => (
                        <div key={item.id}>
                            <img
                                src={item.src}
                                alt={`Slide ${item.id}`}
                                style={{ width: "100%" }}
                            />
                        </div>
                    ))}
                </Carousel>
            </StyledSlider>

            {/* Footer */}
            <StyledFooter>
                <Row gutter={16} justify="center">
                    <Col span={6}>
                        <h4>About Us</h4>
                        <p>
                            Learn more about our team, our mission, and our
                            values.
                        </p>
                    </Col>
                    <Col span={6}>
                        <h4>Contact</h4>
                        <p>Email: contact@company.com</p>
                        <p>Phone: +123 456 7890</p>
                    </Col>
                    <Col span={6}>
                        <h4>Follow Us</h4>
                        <p>Twitter | Facebook | LinkedIn</p>
                    </Col>
                </Row>
                <Row justify="center" style={{ marginTop: "20px" }}>
                    <p>© 2024 Your Company. All rights reserved.</p>
                </Row>
            </StyledFooter>
        </Layout>
    );
};

export default HomePage;

const StyledSlider = styled.div`
    background-color: #001529;
    color: white;
    padding: 20px 0;
    text-align: center;

    img {
        max-height: 400px;
        object-fit: cover;
    }
`;

const StyledFooter = styled(Footer)`
    background-color: #001529;
    color: white;
    padding: 40px 50px;

    h4 {
        color: #ffffff;
        font-size: 18px;
        margin-bottom: 16px;
    }

    p {
        color: #ffffff;
        font-size: 14px;
        margin-bottom: 10px;
    }
`;
