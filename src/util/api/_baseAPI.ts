import axios from "axios";

const _baseURL = import.meta.env.VITE_BACKEND_URL;

const baseURL = (token?: string) => {
    if (token) {
        return axios.create({
            baseURL: _baseURL,
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    } else {
        let _token = localStorage.getItem("token");
        return axios.create({
            baseURL: _baseURL,
            headers: {
                Authorization: "Bearer " + _token,
            },
        });
    }
};

export default baseURL;
