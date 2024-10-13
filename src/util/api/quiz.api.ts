import { formatError } from "../helpers/errorFormatter";
import baseURL from "./_baseAPI";

const quizGetAllAdminAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).get("/quiz/", data);
        if (result.data["status"] === "OK") {
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};

const quizAddAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post("/quiz/add", data);
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
const quizUpdateAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post(
            "/quiz/update/" + data.id,
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

const quizGetOneAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).get("/quiz/" + data.id);
        if (result.data["status"] === "OK") {
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const quizDeleteAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).delete("/quiz/" + data.id);
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
    quizGetAllAdminAPI,
    quizAddAPI,
    quizGetOneAPI as quizGetOne,
    quizDeleteAPI,
    quizUpdateAPI,
};
