import "antd/dist/reset.css"; // Ant Design's core styles
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </React.StrictMode>
);
