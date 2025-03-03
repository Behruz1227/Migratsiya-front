export const getConfig = async () => {
    try {
        const token = sessionStorage.getItem("token");
        if (token) {
            return {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};
export const getConfigImg = async () => {
    try {
        const token = sessionStorage.getItem("token");
        if (token) {
            return {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            };
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};