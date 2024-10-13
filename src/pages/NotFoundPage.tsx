import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <NavBar></NavBar>
            <StyledResult
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" onClick={() => navigate("/")}>
                        Back Home
                    </Button>
                }
            />
        </>
    );
};

export default NotFound;

const StyledResult = styled(Result)`
    color: white;
    background-color: white;
    height: 100vh;
    .ant-result-title {
    }
    .ant-result-subtitle {
    }
`;
