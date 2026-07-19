import axios from "axios";

const api = axios.create({
  baseURL: "https://productivity-tracker-api-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

if (
    token &&
    token !== "undefined" &&
    token !== "null" &&
    config.url !== "/auth/login" &&
    config.url !== "/auth/register"
) {
    config.headers.Authorization = `Bearer ${token}`;
}

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;