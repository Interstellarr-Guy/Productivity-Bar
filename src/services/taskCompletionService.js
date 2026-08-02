import api from "../api/axios";

export default {

    async getAllCompletions() {

        const response = await api.get("/completions/all");

        return response.data;

    }

};