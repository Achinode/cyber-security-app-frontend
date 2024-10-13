const formatError = (error: any) => {
    if (error.isAxiosError) {
        return error.response.data;
    } else {
        return {
            status: "ERROR",
            message: "Unknown Error!",
        };
    }
};

export { formatError };
