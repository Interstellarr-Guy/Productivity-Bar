import api from "../api/axios";

const workspaceService = {

  getWorkspaces: async () => {
    const response = await api.get("/workspaces");
    return response.data;
  },

  createWorkspace: async (name) => {
    const response = await api.post("/workspaces", {
      name,
    });

    return response.data;
  },

};

export default workspaceService;