export const isAuthenticated = () => {

    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");

    if (!token || !expiresAt) {
        return false;
    }

    if (Date.now() > Number(expiresAt)) {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("email");
        localStorage.removeItem("workspaceId");
        localStorage.removeItem("expiresAt");

        return false;
    }

    return true;
};