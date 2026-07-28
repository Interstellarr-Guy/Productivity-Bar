import api from "../api/axios";

const statisticsService = {

    getStatistics: async () => {

        const response = await api.get("/statistics");

        return response.data;

    }

};

export default statisticsService;