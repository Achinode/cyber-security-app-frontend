import React, { useState } from "react";
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
import { quizAddAPI } from "../../util/api/quiz.api";
import { useAuth } from "../../util/contexts/AuthContext";

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

const AdminAddQuiz: React.FC = () => {
    const [form] = Form.useForm();
    const { user } = useAuth();
    const [quizName, setQuizName] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]); // Local answers for the current question
    const [loading, setLoading] = useState(false);

    // Function to add an answer to the list of answers for the current question
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

    // Function to add the question with answers to the list of questions
    const handleAddQuestion = () => {
        const currentValues = form.getFieldsValue();
        const { orderNo, question, correctAnswer } = currentValues;

        if (answers.length > 0 && correctAnswer) {
            const newQuestion: Question = {
                orderNo,
                question,
                correctAnswer,
                answers,
            };

            setQuestions([...questions, newQuestion]);
            setAnswers([]); // Reset the local answers array after adding question
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

    // Function to handle form submission
    const handleSubmit = async () => {
        if (!quizName) {
            return message.error("Quiz Name Required!");
        }

        setLoading(true);
        const quizData = {
            quizName: quizName,
            questionList: questions,
        };

        setLoading(true);
        const res = await quizAddAPI({ ...quizData, token: user?.token });
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
            <Typography.Title>Add New Quiz</Typography.Title>

            <Form form={form} layout="vertical">
                {/* Quiz Name */}
                {/* <Form.Item
                    label="Quiz Name"
                    name="quizName"
                    rules={[
                        {
                            required: true,
                            message: "Please input the quiz name!",
                        },
                    ]}
                > */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography.Text style={{ fontWeight: "bold" }}>
                        Quiz Name
                    </Typography.Text>
                    <Input
                        onChange={(e) => {
                            setQuizName(e.target.value);
                        }}
                        placeholder="Enter quiz name"
                        width={"100%"}
                        style={{ width: 200, margin: 8, marginLeft: 0 }}
                    />
                </div>
                {/* </Form.Item> */}

                {/* Add Questions Section */}
                <Card title="Add Question">
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

                    {/* Add Question Button */}
                    <Button type="default" onClick={handleAddQuestion} block>
                        Add Question
                    </Button>
                </Card>

                {/* Display Added Questions */}
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
                        Submit Quiz
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminAddQuiz;
