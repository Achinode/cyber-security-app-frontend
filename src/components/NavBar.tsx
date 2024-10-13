import React from "react";
import { Layout, Menu, Button } from "antd";
import { styled } from "styled-components";
import {
    HomeOutlined,
    InfoCircleOutlined,
    MailOutlined,
    SecurityScanOutlined,
} from "@ant-design/icons";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import Link from "antd/es/typography/Link";

const { Header } = Layout;

// Define the menu items with React Router links
const menuItems: ItemType<MenuItemType>[] = [
    {
        label: <Link href="/">Home</Link>,
        key: "home",
        icon: <HomeOutlined />,
    },
    {
        label: <Link href="/about">About</Link>,
        key: "about",
        icon: <InfoCircleOutlined />,
    },
    {
        label: <Link href="/contact">Contact</Link>,
        key: "contact",
        icon: <MailOutlined />,
    },
    {
        label: <Link href="/privacy-policy">Privacy Policy</Link>,
        key: "privacy-policy",
        icon: <SecurityScanOutlined />,
    },
];

const NavBar: React.FC = () => {
    return (
        <Header>
            <NavContainer>
                <StyledMenu theme="dark" mode="horizontal" items={menuItems} />
                <ButtonContainer>
                    <StyledButton type="primary">
                        <Link href="/sign-up">Sign Up</Link>
                    </StyledButton>
                    <StyledButton type="default">
                        <Link href="/sign-in">Sign In</Link>
                    </StyledButton>
                </ButtonContainer>
            </NavContainer>
        </Header>
    );
};

export default NavBar;

// Styled components for customization
const StyledMenu = styled(Menu)`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    background-color: #001529;
    & * {
        color: white;
    }
`;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const StyledButton = styled(Button)`
    & a {
        color: inherit; /* Inherit button's color */
    }
`;
