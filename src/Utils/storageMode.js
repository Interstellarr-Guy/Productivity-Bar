export const isLoggedIn = () => {

    const token = localStorage.getItem("token");

    if (!token) {
        return false;
    }

    try {

        const payload = JSON.parse(
            atob(token.split(".")[1])
        );

        const currentTime = Math.floor(Date.now() / 1000);

        if (payload.exp && payload.exp < currentTime) {

            // JWT expired
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            localStorage.removeItem("email");
            localStorage.removeItem("workspaceId");

            return false;
        }

        return true;

    } catch (error) {

        console.error("Invalid JWT:", error);

        return false;
    }
};

export const isGuest = () => {
    return !isLoggedIn();
};
