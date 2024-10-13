import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    Card,
    Select,
    message,
    Row,
    Col,
    Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../util/contexts/AuthContext";
import { quizGetOne, quizUpdateAPI } from "../../util/api/quiz.api";

interface Answer {
    answerID: number;
    answer: string;
}

interface Question {
    orderNo: number;
    question: string;
    correctAnswer: number;
    answers: Answer[];
}

const AdminEditQuiz: React.FC = () => {
    const [form] = Form.useForm();
    const { quizId } = useParams<{ quizId: string }>(); // Retrieve quizId from the URL
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]); // Local answers for the current question
    const [loading, setLoading] = useState(false);
    const [quizName, setQuizName] = useState("");

    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await quizGetOne({
                token: user?.token,
                id: quizId,
            });
            if (res.data && res.status == "OK") {
                setQuizName(res.data.quizName);
                setQuestions(res.data.questionList);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
        getData();
    }, [quizId, form]);

    const handleAddAnswer = () => {
        const currentValues = form.getFieldsValue();
        const { answer } = currentValues;

        if (answer) {
            const newAnswer: Answer = {
                answerID: answers.length + 1,
                answer,
            };

            setAnswers([...answers, newAnswer]);
            form.resetFields(["answer"]); // Reset answer field after adding
        }
    };

    // Function to add or update a question in the list
    const handleAddOrUpdateQuestion = () => {
        const currentValues = form.getFieldsValue();
        const { orderNo, question, correctAnswer } = currentValues;

        if (answers.length > 0 && correctAnswer) {
            const newQuestion: Question = {
                orderNo,
                question,
                correctAnswer,
                answers,
            };

            const questionIndex = questions.findIndex(
                (q) => q.orderNo === orderNo
            );

            if (questionIndex > -1) {
                const updatedQuestions = [...questions];
                updatedQuestions[questionIndex] = newQuestion;
                setQuestions(updatedQuestions);
            } else {
                setQuestions([...questions, newQuestion]);
            }

            setAnswers([]); // Reset the local answers array after adding/updating question
            form.resetFields(["orderNo", "question", "correctAnswer"]);
        } else {
            message.error("Please add answers and select the correct answer.");
        }
    };

    // Function to remove a question from the list
    const handleRemoveQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    // Handle form submission to update the quiz
    const handleSubmit = async () => {
        if (!quizName) {
            return message.error("Quiz Name Required!");
        }

        setLoading(true);
        const res = await quizUpdateAPI({
            token: user?.token,
            id: quizId,
            quizName,
            questions,
        });
        if (res.status == "OK") {
            message.success(res.message || "Success");
            navigate("/admin/view-quizzes");
        } else {
            message.error(res.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
            <Typography.Title>Edit Quiz</Typography.Title>

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography.Text style={{ fontWeight: "bold" }}>
                        Quiz Name
                    </Typography.Text>
                    <Input
                        value={quizName}
                        onChange={(e) => {
                            setQuizName(e.target.value);
                        }}
                        placeholder="Enter quiz name"
                        width={"100%"}
                        style={{ width: 200, margin: 8, marginLeft: 0 }}
                    />
                </div>

                {/* Add/Edit Questions Section */}
                <Card title="Add/Edit Question">
                    {/* Order Number */}
                    <Form.Item
                        label="Order Number"
                        name="orderNo"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input the question order number!",
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            placeholder="Enter question order number"
                        />
                    </Form.Item>

                    {/* Question Text */}
                    <Form.Item
                        label="Question"
                        name="question"
                        rules={[
                            {
                                required: true,
                                message: "Please input the question!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter question" />
                    </Form.Item>

                    {/* Add Answer Section */}
                    <Form.Item label="Answer">
                        <Row gutter={8}>
                            <Col span={20}>
                                <Form.Item
                                    name="answer"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the answer!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter answer" />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Button
                                    type="default"
                                    onClick={handleAddAnswer}
                                >
                                    Add Answer
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>

                    {/* Display Added Answers */}
                    <div>
                        {answers.length > 0 ? (
                            <Card title="Answers">
                                <ul>
                                    {answers.map((answer) => (
                                        <li key={answer.answerID}>
                                            <b>Answer {answer.answerID}:</b>{" "}
                                            {answer.answer}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        ) : null}
                    </div>

                    {/* Correct Answer (Dropdown based on answers added) */}
                    <Form.Item
                        label="Correct Answer"
                        name="correctAnswer"
                        rules={[
                            {
                                required: true,
                                message: "Please select the correct answer!",
                            },
                        ]}
                    >
                        <Select placeholder="Select correct answer">
                            {answers.map((answer) => (
                                <Select.Option
                                    key={answer.answerID}
                                    value={answer.answerID}
                                >
                                    Answer {answer.answerID}: {answer.answer}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Add/Update Question Button */}
                    <Button
                        type="default"
                        onClick={handleAddOrUpdateQuestion}
                        block
                    >
                        Add/Update Question
                    </Button>
                </Card>

                {/* Display Added/Edited Questions */}
                <div style={{ marginTop: "20px" }}>
                    {questions.map((q, index) => (
                        <Card
                            key={index}
                            title={`Question ${q.orderNo}`}
                            extra={
                                <Button
                                    type="link"
                                    danger
                                    onClick={() => handleRemoveQuestion(index)}
                                >
                                    Remove
                                </Button>
                            }
                        >
                            <p>
                                <b>Question:</b> {q.question}
                            </p>
                            <p>
                                <b>Correct Answer ID:</b> {q.correctAnswer}
                            </p>
                            <ul>
                                {q.answers.map((answer) => (
                                    <li key={answer.answerID}>
                                        <b>Answer {answer.answerID}:</b>{" "}
                                        {answer.answer}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>

                {/* Submit Quiz */}
                <Form.Item style={{ marginTop: "20px" }}>
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={loading}
                        block
                    >
                        Submit Updated Quiz
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminEditQuiz;
