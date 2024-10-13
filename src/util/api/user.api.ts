import { formatError } from "../helpers/errorFormatter";
import baseURL from "./_baseAPI";

const userSignInAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post("/user/signin", data);
        if (result.data["status"] === "OK") {
            const data = result.data.data;
            localStorage.setItem("token", result.data["token"]);
            return {
                userId: data["userId"],
                name: data["name"],
                email: data["email"],
                token: data["token"],
                fullName: data["fullName"] || "",
            };
        } else if (result.data["status"] == "ACTIVATE_EMAIL") {
            return {
                status: "ACTIVATE_EMAIL",
                userId: result.data.data.userId,
            };
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const userUpdateOneAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post("/user/single", data);
        if (result.data["status"] === "OK") {
            localStorage.setItem("token", result.data["token"]);
            return true;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const userPasswordChange = async (data: any) => {
    try {
        const result = await baseURL(data.token).post(
            "/user/password-change",
            data
        );
        if (result.data["status"] === "OK") {
            localStorage.setItem("token", result.data["token"]);
            return true;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const userSignUpAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post("/user/signup", data);
        if (result.data["status"] === "OK") {
            localStorage.setItem("token", result.data["token"]);
            return true;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};

const userGetAllAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).get("/user/", data);
        if (result.data["status"] === "OK") {
            localStorage.setItem("token", result.data["token"]);
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const userDeleteAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).delete(
            "/user/delete/" + data.id
        );
        if (result.data["status"] === "OK") {
            localStorage.setItem("token", result.data["token"]);
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const userGetOneAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).get("/user/single");
        if (result.data["status"] === "OK") {
            localStorage.setItem("token", result.data["token"]);
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const userActivateAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post(
            "/user/deactivate/" + data.id
        );
        if (result.data["status"] === "OK") {
            localStorage.setItem("token", result.data["token"]);
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const userActivateEmailAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post(
            "/user/activate-email/" + data.id
        );
        if (result.data["status"] === "OK") {
            localStorage.setItem("token", result.data["token"]);
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const userValidateOTPAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post(
            "/user/validate-otp/",
            data
        );
        if (result.data["status"] === "OK") {
            localStorage.setItem("token", result.data["token"]);
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};

export {
    userSignInAPI,
    userSignUpAPI,
    userGetAllAPI,
    userGetOneAPI,
    userUpdateOneAPI,
    userPasswordChange,
    userDeleteAPI,
    userActivateAPI,
    userActivateEmailAPI,
    userValidateOTPAPI,
};
