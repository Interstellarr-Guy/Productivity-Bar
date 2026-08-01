export function isTokenExpired() {

    const expiresAt =
        localStorage.getItem("expiresAt");

    if (!expiresAt) return true;

    return Date.now() > Number(expiresAt);

}