import api from "../api/axios";

const statisticsService = {

    getStatistics: async () => {

        const response = await api.get("/statistics");

        return response.data;

    },

     getWeeklyProductivity: async () => {

        const response = await api.get("/statistics/weekly");

        return response.data;

    },

     getHeatmap: async () => {

        const response =
            await api.get("/statistics/heatmap");

        return response.data;

    }

};

export default statisticsService;