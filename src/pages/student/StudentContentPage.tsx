import React, { useEffect, useState } from "react";
import { Button, Card, Spin, Typography, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../../util/contexts/AuthContext";
import { contentGetOne } from "../../util/api/content.api";
import { ArrowLeftOutlined } from "@ant-design/icons";

// Sample data based on the provided contentSchema
const sampleContent = {
    orderNo: 1,
    subjectName: "",
    mdContent: ` `,
    quizID: "",
};

const StudentContentPage: React.FC = () => {
    const navigate = useNavigate();
    const { contentId } = useParams<{ contentId: string }>();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const [contentData, setContentData] = useState(sampleContent);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await contentGetOne({
                token: user?.token,
                id: contentId,
            });
            if (res.data && res.status == "OK") {
                res.data && setContentData(res.data);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
        getData();
    }, []);

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
            <Typography.Title>{contentData.subjectName}</Typography.Title>
            <Button
                type="link"
                icon={<ArrowLeftOutlined></ArrowLeftOutlined>}
                onClick={() => navigate(`/student/home`)}
                style={{ marginBottom: "20px" }}
            >
                Back to Home
            </Button>
            {loading && <Spin fullscreen size="large"></Spin>}

            <Card>
                {/* Subject Title */}

                {/* Markdown Content */}
                <ReactMarkdown>{contentData.mdContent}</ReactMarkdown>

                {/* Attend Quiz Button */}
                {contentData.quizID && (
                    <Button
                        type="primary"
                        onClick={() =>
                            navigate(`/student/quiz/${contentData.quizID}`)
                        }
                        style={{ marginTop: "20px" }}
                    >
                        Attend Quiz
                    </Button>
                )}
            </Card>
        </div>
    );
};

export default StudentContentPage;
