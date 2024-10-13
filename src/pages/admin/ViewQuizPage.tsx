import React, { useEffect, useState } from "react";
import { Button, List, Card, message, Spin, Typography, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { quizDeleteAPI, quizGetAllAdminAPI } from "../../util/api/quiz.api";
import { useAuth } from "../../util/contexts/AuthContext";
import ButtonGroup from "antd/es/button/button-group";

const ViewQuizPage: React.FC = () => {
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await quizGetAllAdminAPI({ token: user?.token });
            if (res.data && res.status === "OK") {
                Array.isArray(res.data) && setQuizzes(res.data);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
        getData();
    }, []);

    const handleEditQuiz = (quizId: number) => {
        navigate(`/admin/edit-quiz/${quizId}`);
    };

    const showDeleteConfirmation = (quizId: number) => {
        setSelectedQuizId(quizId);
        setIsModalVisible(true);
    };

    const handleDeleteQuiz = async () => {
        if (selectedQuizId !== null) {
            setLoading(true);
            const res = await quizDeleteAPI({
                token: user?.token,
                id: selectedQuizId,
            });
            if (res.status === "OK") {
                const updatedQuizzes = quizzes.filter(
                    (quiz) => quiz._id !== selectedQuizId
                );
                setQuizzes(updatedQuizzes);
                message.success("Quiz deleted successfully!");
            } else {
                message.error(res.message);
            }
            setLoading(false);
            setIsModalVisible(false);
        }
    };

    const handleCancelDelete = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography.Title>View Quizzes</Typography.Title>
            {loading && <Spin size="large" fullscreen />}
            <List
                dataSource={quizzes}
                renderItem={(item) => (
                    <Card key={item._id} style={{ marginBottom: "10px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>
                                <b>{item.quizName}</b>
                            </span>
                            <ButtonGroup>
                                <Button
                                    type="default"
                                    onClick={() => handleEditQuiz(item._id)}
                                >
                                    Edit Quiz
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() =>
                                        showDeleteConfirmation(item._id)
                                    }
                                >
                                    Delete Quiz
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Card>
                )}
            />

            {/* Delete Confirmation Modal */}
            <Modal
                title="Confirm Delete"
                open={isModalVisible}
                onOk={handleDeleteQuiz}
                onCancel={handleCancelDelete}
                okText="Yes"
                cancelText="No"
                confirmLoading={loading}
            >
                <p>Are you sure you want to delete this quiz?</p>
            </Modal>
        </div>
    );
};

export default ViewQuizPage;
