import { formatError } from "../helpers/errorFormatter";
import baseURL from "./_baseAPI";

const contentAddAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post("/content/add", data);
        if (result.data["status"] === "OK") {
            const data = result.data;
            return data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const contentUpdateAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post(
            "/content/update/" + data.id,
            data
        );
        if (result.data["status"] === "OK") {
            const data = result.data;
            return data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const contentGetAllAdminAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).get("/content/", data);
        if (result.data["status"] === "OK") {
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const contentGetAllStudentAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).get("/content/student", data);
        if (result.data["status"] === "OK") {
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const contentGetOne = async (data: any) => {
    try {
        const result = await baseURL(data.token).get("/content/" + data.id);
        if (result.data["status"] === "OK") {
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const contentDeleteAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).delete("/content/" + data.id);
        if (result.data["status"] === "OK") {
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};

export {
    contentAddAPI,
    contentGetAllAdminAPI,
    contentGetAllStudentAPI,
    contentGetOne,
    contentUpdateAPI,
    contentDeleteAPI,
};
