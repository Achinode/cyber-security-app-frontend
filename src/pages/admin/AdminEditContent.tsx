import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Typography, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { quizGetAllAdminAPI } from "../../util/api/quiz.api";
import { useAuth } from "../../util/contexts/AuthContext";
import { contentGetOne, contentUpdateAPI } from "../../util/api/content.api";

// Sample Quiz IDs for the dropdown (same as before)
interface Quiz {
    quizID?: string;
    _id?: string;
    quizName: string;
}
const initialData = {
    orderNo: 1,
    subjectName: "Sample Subject",
    mdContent: "## Sample Markdown Content",
    quizID: "12345abcde",
};
const AdminEditContent: React.FC = () => {
    const [form] = Form.useForm();
    const { contentId } = useParams<{ contentId: string }>(); // Get contentId from the URL
    const [loading, setLoading] = useState(false);

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        async function getQuiz() {
            setLoading(true);
            const res = await quizGetAllAdminAPI({ token: user?.token });
            if (res.data && res.status == "OK") {
                Array.isArray(res.data) && setQuizzes(res.data);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
        async function getData() {
            setLoading(true);
            const res = await contentGetOne({
                token: user?.token,
                id: contentId,
            });
            if (res.data && res.status == "OK") {
                // Array.isArray(res.data) && setQuizzes(res.data);
                res.data && form.setFieldsValue(res.data);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
        getData();
        getQuiz();
    }, [contentId, form]);

    // Handle form submission for editing the course content
    const handleFinish = async (values: any) => {
        setLoading(true);
        const res = await contentUpdateAPI({
            token: user?.token,
            id: contentId,
            ...values,
        });
        if (res.status == "OK") {
            message.success(res.message || "Success");
            navigate("/admin/view-contents");
        } else {
            message.error(res.message);
        }
        setLoading(false);
    };

    if (loading && !initialData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
            <Typography.Title>Edit Course Content</Typography.Title>
            {loading && <Spin fullscreen size="large"></Spin>}
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={initialData}
            >
                {/* Order No */}
                <Form.Item
                    label="Order Number"
                    name="orderNo"
                    rules={[
                        {
                            required: true,
                            message: "Please input the order number!",
                        },
                    ]}
                >
                    <Input type="number" placeholder="Enter order number" />
                </Form.Item>

                {/* Subject Name */}
                <Form.Item
                    label="Subject Name"
                    name="subjectName"
                    rules={[
                        {
                            required: true,
                            message: "Please input the subject name!",
                        },
                    ]}
                >
                    <Input placeholder="Enter subject name" />
                </Form.Item>

                {/* Markdown Content */}
                <Form.Item
                    label="Content (Markdown)"
                    name="mdContent"
                    rules={[
                        {
                            required: true,
                            message: "Please input the content!",
                        },
                    ]}
                >
                    <Input.TextArea
                        rows={6}
                        placeholder="Enter content in markdown format"
                    />
                </Form.Item>

                {/* Quiz ID Dropdown */}
                <Form.Item
                    label="Quiz"
                    name="quizID"
                    rules={[
                        { required: false, message: "Please select a quiz!" },
                    ]}
                >
                    <Select placeholder="Select a quiz">
                        {quizzes.map((quiz, index) => (
                            <Select.Option
                                key={quiz._id || index}
                                value={quiz._id}
                            >
                                {quiz.quizName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Update Course
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminEditContent;
