import React, { useEffect, useState } from "react";
import { Button, List, Card, message, Typography, Spin, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../util/contexts/AuthContext";
import {
    contentDeleteAPI,
    contentGetAllAdminAPI,
} from "../../util/api/content.api";
import ButtonGroup from "antd/es/button/button-group";

const ViewContentsPage: React.FC = () => {
    const [contents, setContents] = useState<any[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState<number | null>(
        null
    );

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await contentGetAllAdminAPI({ token: user?.token });
            if (res.data && res.status == "OK") {
                Array.isArray(res.data) && setContents(res.data);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
        getData();
    }, []);

    const handleEditContent = (contentId: number) => {
        navigate(`/admin/edit-content/${contentId}`);
    };

    const showDeleteConfirmation = (contentId: number) => {
        setSelectedContentId(contentId);
        setIsModalVisible(true);
    };

    const handleDeleteContent = async () => {
        if (selectedContentId !== null) {
            setLoading(true);
            const res = await contentDeleteAPI({
                token: user?.token,
                id: selectedContentId,
            });
            if (res.status === "OK") {
                const updatedContents = contents.filter(
                    (cont) => cont._id !== selectedContentId
                );
                setContents(updatedContents);
                message.success("Content deleted successfully!");
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
            <Typography.Title>View Contents</Typography.Title>
            {loading && <Spin size="large" fullscreen></Spin>}
            <List
                dataSource={contents}
                renderItem={(item) => (
                    <Card key={item._id} style={{ marginBottom: "10px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>
                                <b>{item.orderNo}: </b>
                                {item.subjectName}
                            </span>
                            <ButtonGroup>
                                <Button
                                    type="default"
                                    onClick={() => handleEditContent(item._id)}
                                >
                                    Edit Content
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() =>
                                        showDeleteConfirmation(item._id)
                                    }
                                >
                                    Delete Content
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
                onOk={handleDeleteContent}
                onCancel={handleCancelDelete}
                okText="Yes"
                cancelText="No"
                confirmLoading={loading}
            >
                <p>Are you sure you want to delete this content?</p>
            </Modal>
        </div>
    );
};

export default ViewContentsPage;
