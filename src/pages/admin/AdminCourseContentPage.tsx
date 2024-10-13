import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Typography } from "antd";
import { contentAddAPI } from "../../util/api/content.api";
import { useAuth } from "../../util/contexts/AuthContext";
import { quizGetAllAdminAPI } from "../../util/api/quiz.api";

interface Quiz {
    _id: string;
    quizName: string;
}

const AdminAddCourseContentPage: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await quizGetAllAdminAPI({ token: user?.token });
            if (res.data && res.status == "OK") {
                Array.isArray(res.data) && setQuizzes(res.data);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
        getData();
    }, []);

    const handleFinish = async (values: any) => {
        setLoading(true);
        const res = await contentAddAPI({ ...values, token: user?.token });
        if (res.data && res.status == "OK") {
            message.success(res.message);
            form.resetFields();
        } else {
            message.error(res.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
            <Typography.Title>Add New Course</Typography.Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{ isActive: true }}
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
                        {quizzes &&
                            quizzes.map((quiz) => (
                                <Select.Option key={quiz._id} value={quiz._id}>
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
                        Add Course
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminAddCourseContentPage;
