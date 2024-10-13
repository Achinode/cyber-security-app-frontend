import { formatError } from "../helpers/errorFormatter";
import baseURL from "./_baseAPI";

const submitAnswerAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post("/answer/add", data);
        if (result.data["status"] === "OK") {
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const getAnswersOfStudentAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).get("/answer/student");
        if (result.data["status"] === "OK") {
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};
const finishAnswerAPI = async (data: any) => {
    try {
        const result = await baseURL(data.token).post(
            "/answer/finish/" + data.id
        );
        if (result.data["status"] === "OK") {
            return result.data;
        } else {
            throw Error("Unknown Error!");
        }
    } catch (error) {
        return formatError(error);
    }
};

export { submitAnswerAPI, finishAnswerAPI, getAnswersOfStudentAPI };
