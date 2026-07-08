import api from "../api/axios";

const authService = {

  login: async (loginData) => {
    const response = await api.post("/auth/login", loginData);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.id);
    localStorage.setItem("userName", response.data.name);
    localStorage.setItem("email", response.data.email);

    return response.data;
  },

  register: async (registerData) => {
    const response = await api.post("/auth/register", registerData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("productivityData");
  },

};

export default authService;