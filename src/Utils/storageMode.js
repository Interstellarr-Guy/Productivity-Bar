export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
};

export const isGuest = () => {
    return !isLoggedIn();
};