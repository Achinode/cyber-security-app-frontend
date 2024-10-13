import { ProfileFilled } from "@ant-design/icons";
import {
    Button,
    Divider,
    List,
    Progress,
    Spin,
    Tag,
    Typography,
    message,
} from "antd";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useAuth } from "../../util/contexts/AuthContext";
import { getAnswersOfStudentAPI } from "../../util/api/answer.api";
import { userGetOneAPI } from "../../util/api/user.api";
import { useNavigate } from "react-router-dom";
import { formatToFunction } from "../../util/helpers/stringFormatter";

export default function StudentHomePage() {
    const [loading, setLoading] = useState(false);
    const [resetQuizzes, setResetQuizzes] = useState<any>([]);
    const [resUser, setResUser] = useState<any>({});
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await getAnswersOfStudentAPI({ token: user?.token });
            if (res.data && res.status == "OK") {
                Array.isArray(res.data) && setResetQuizzes(res.data);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }

        async function getUserData() {
            const res = await userGetOneAPI({ token: user?.token });
            if (res.data && res.status == "OK") {
                res.data && setResUser(res.data);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        }
        getData();
        getUserData();
    }, []);
    return (
        <div>
            {loading && <Spin size="large" fullscreen></Spin>}
            <TwoColumns>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "centers",
                        width: "100%",
                    }}
                >
                    <Progress type="circle" percent={resUser.progress || 0} />
                    <Typography.Text style={{ fontSize: "24pt" }}>
                        Your Progress
                    </Typography.Text>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "centers",
                        width: "100%",
                        flexDirection: "column",
                    }}
                >
                    <Typography.Text style={{ fontSize: "24pt" }}>
                        Current Marks
                    </Typography.Text>
                    <div>
                        <Typography.Text code style={{ fontSize: "36px" }}>
                            {formatToFunction(resUser.overallMarks) || 0}
                        </Typography.Text>
                        <Typography.Text
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                            %
                        </Typography.Text>
                    </div>
                </div>
            </TwoColumns>
            <Divider></Divider>
            <Typography.Title>Recent Courses</Typography.Title>
            <List
                style={{ paddingLeft: "24px" }}
                itemLayout="horizontal"
                dataSource={resetQuizzes}
                renderItem={(item: any) => (
                    <List.Item
                        actions={[
                            !item.isFinished && (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        onClick={() =>
                                            navigate(
                                                "/student/quiz/" +
                                                    (item.quizID &&
                                                        item.quizID._id)
                                            )
                                        }
                                    >
                                        Attend
                                    </Button>
                                    <Typography.Text>
                                        Attempts : {item.attempts || 0}
                                    </Typography.Text>
                                </div>
                            ),
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<ProfileFilled></ProfileFilled>}
                            title={
                                <div>
                                    {item.quizID && item.quizID.quizName}{" "}
                                    <Typography.Text code>
                                        {item.marks || 0} %
                                    </Typography.Text>
                                    {item.isFinished ? (
                                        <Tag color="green">Finished</Tag>
                                    ) : (
                                        <Tag color="blue">In Progress</Tag>
                                    )}
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}

const TwoColumns = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
