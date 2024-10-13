import React, { useEffect, useState } from "react";
import {
    Card,
    Radio,
    Button,
    message,
    Tag,
    Typography,
    Spin,
    Modal,
} from "antd";
import { useAuth } from "../../util/contexts/AuthContext";
import { quizGetOne } from "../../util/api/quiz.api";
import { useNavigate, useParams } from "react-router-dom";
import { finishAnswerAPI, submitAnswerAPI } from "../../util/api/answer.api";
import { ArrowLeftOutlined } from "@ant-design/icons";

interface Answer {
    answerID: number;
    answer: string;
}

interface Question {
    orderNo: number;
    question: string;
    answers: Answer[];
    correctAnswer: number;
    _id?: string;
}

interface Quiz {
    quizName: string;
    questionList: Question[];
}

const _quizData: Quiz = {
    quizName: "Quiz",
    questionList: [
        {
            orderNo: 1,
            question: "-",
            answers: [],
            correctAnswer: 0,
        },
    ],
};

const StudentQuizPage: React.FC = () => {
    const { quizId } = useParams<{ quizId: string }>();

    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: number]: number;
    }>({});
    const [submitted, setSubmitted] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false); // State for the modal
    const { user } = useAuth();
    const [quizData, setQuizData] = useState(_quizData);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await quizGetOne({
                token: user?.token,
                id: quizId,
            });
            if (res.data && res.status == "OK") {
                res.data && setQuizData(res.data);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
        getData();
    }, []);

    const handleAnswerChange = (questionNo: number, answerID: number) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionNo]: answerID,
        });
    };

    const handleSubmit = async () => {
        setShowCorrectAnswers(false);
        let score = 0;
        const answersList: any = [];
        quizData.questionList.forEach((question) => {
            if (selectedAnswers[question.orderNo] === question.correctAnswer) {
                score += 1;
            }
            answersList.push({
                questionID: question._id,
                answer: question.orderNo,
            });
        });

        setLoading(true);

        const res = await submitAnswerAPI({
            token: user?.token,
            userID: user?.userId,
            quizID: quizId,
            marks: Math.round((score / quizData.questionList.length) * 100),
            answersList: answersList,
        });
        setLoading(false);
        if (res.status == "OK") {
            message.success(
                `You scored ${score}/${quizData.questionList.length}`
            );
            setSubmitted(true);
        } else {
            message.error(res.message);
        }
    };

    const showCorrectAnswersModal = () => {
        setIsModalVisible(true); // Show the modal when user clicks "Show Correct Answers"
    };

    const handleModalOk = async () => {
        setIsModalVisible(false);
        setLoading(true);

        const res = await finishAnswerAPI({
            token: user?.token,
            id: quizId,
        });
        setLoading(false);
        if (res.status == "OK") {
            message.success(res.message);
            setShowCorrectAnswers(true);
        } else {
            message.error(res.message);
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false); // Close the modal if user cancels
    };

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
            {loading && <Spin fullscreen size="large"></Spin>}

            <Typography.Title>{quizData.quizName}</Typography.Title>
            <Button
                type="link"
                icon={<ArrowLeftOutlined></ArrowLeftOutlined>}
                onClick={() => navigate(`/student/home`)}
                style={{ marginBottom: "20px" }}
            >
                Back to Home
            </Button>
            {quizData.questionList.map((question) => (
                <Card
                    key={question.orderNo}
                    title={`Question ${question.orderNo}`}
                    style={{ marginBottom: "20px" }}
                >
                    <p>{question.question}</p>

                    {/* Radio group for answers */}
                    <Radio.Group
                        onChange={(e) =>
                            handleAnswerChange(question.orderNo, e.target.value)
                        }
                        value={selectedAnswers[question.orderNo]}
                        disabled={submitted}
                    >
                        {question.answers.map((answer) => (
                            <Radio
                                key={answer.answerID}
                                value={answer.answerID}
                            >
                                {answer.answer}
                            </Radio>
                        ))}
                    </Radio.Group>

                    {/* Correct Answer Display */}
                    {showCorrectAnswers && (
                        <div style={{ marginTop: "10px" }}>
                            <Tag color="green">
                                Correct Answer:{" "}
                                {
                                    question.answers.find(
                                        (a) =>
                                            a.answerID ===
                                            question.correctAnswer
                                    )?.answer
                                }
                            </Tag>
                        </div>
                    )}
                </Card>
            ))}

            {/* Submit Button */}
            {!submitted ? (
                <Button type="primary" onClick={handleSubmit} block>
                    Submit Quiz
                </Button>
            ) : (
                <>
                    <Button
                        style={{ margin: "4px" }}
                        type="default"
                        onClick={showCorrectAnswersModal} // Trigger modal on click
                        block
                    >
                        Show Correct Answers
                    </Button>

                    <Button
                        style={{ margin: "4px" }}
                        type="primary"
                        block
                        onClick={() => {
                            setSubmitted(false);
                            setShowCorrectAnswers(false);
                        }}
                    >
                        Retake Quiz
                    </Button>
                </>
            )}

            {/* Modal for finalizing submission */}
            <Modal
                title="Finalize Submission"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Confirm"
                cancelText="Cancel"
            >
                <p>
                    Your submission will be finalized after viewing the correct
                    answers. No more attempts will be granted. Are you sure you
                    want to proceed?
                </p>
            </Modal>
        </div>
    );
};

export default StudentQuizPage;
