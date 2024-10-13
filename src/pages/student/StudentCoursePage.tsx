import { ProfileFilled } from "@ant-design/icons";
import { Button, List, Spin, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../util/contexts/AuthContext";
import { contentGetAllStudentAPI } from "../../util/api/content.api";
import { useNavigate } from "react-router-dom";

export default function StudentCoursePage() {
    const [contents, setContents] = useState<any[]>([]);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await contentGetAllStudentAPI({ token: user?.token });
            if (res.data && res.status == "OK") {
                Array.isArray(res.data) && setContents(res.data);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
        getData();
    }, []);
    return (
        <div>
            <Typography.Title>My Courses</Typography.Title>
            {loading && <Spin fullscreen size="large"></Spin>}
            <List
                style={{ paddingLeft: "32px" }}
                itemLayout="horizontal"
                dataSource={contents}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button
                                type="primary"
                                onClick={() =>
                                    navigate("/student/content/" + item._id)
                                }
                            >
                                View Course
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<ProfileFilled></ProfileFilled>}
                            title={<div>{item.subjectName} </div>}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}
