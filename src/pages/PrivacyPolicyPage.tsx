import React, { useState, useEffect } from "react";
import { Layout, Typography, Spin } from "antd";
import ReactMarkdown from "react-markdown";
import { Content } from "antd/lib/layout/layout";
import NavBar from "../components/NavBar";

const { Title } = Typography;

const PrivacyPolicyPage: React.FC = () => {
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the privacy policy markdown file from assets
        fetch("/privacy-policy.md")
            .then((response) => response.text())
            .then((text) => setContent(text))
            .catch((error) =>
                console.error("Error fetching the markdown file:", error)
            );
    }, []);

    return (
        <>
            <NavBar></NavBar>
            <Layout
                style={{
                    minHeight: "100vh",
                    padding: "50px",
                    backgroundColor: "#f0f2f5",
                }}
            >
                <Content>
                    <div
                        style={{
                            maxWidth: "800px",
                            margin: "0 auto",
                            // textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                maxWidth: "800px",
                                margin: "0 auto",
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            <Title level={2}>Privacy and Policy</Title>
                        </div>
                        {content ? (
                            <ReactMarkdown>{content}</ReactMarkdown>
                        ) : (
                            <Spin tip="Loading..." />
                        )}
                    </div>
                </Content>
            </Layout>
        </>
    );
};

export default PrivacyPolicyPage;
