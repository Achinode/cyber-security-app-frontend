import { formatError } from "../helpers/errorFormatter";
import baseURL from "./_baseAPI";

const adminSignInAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post("/admin/signin", data);
        if (result.data["status"] === "OK") {
            const data = result.data.data;
            localStorage.setItem("token", result.data["token"]);
            return {
                userId: data["userId"],
                name: data["name"],
                email: data["email"],
                token: data["token"],
            };
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};

const adminAddAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post("/admin/signup", data);
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
const adminGetAllAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).get("/admin/", data);
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
const adminDeleteAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).delete("/admin/" + data.id);
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

export { adminSignInAPI, adminAddAPI, adminGetAllAPI, adminDeleteAPI };
