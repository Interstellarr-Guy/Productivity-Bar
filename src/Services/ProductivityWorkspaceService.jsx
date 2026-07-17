import api from "../api/axios";

const productivityWorkspaceService = {

    async getWorkspace() {
        const response = await api.get("/productivity-workspace");
        return response.data;
    },

    async updateWorkspace(productivityData) {

        const response = await api.put(
            "/productivity-workspace",
            {
                productivityData
            }
        );

        return response.data;
    }

};

export default productivityWorkspaceService;