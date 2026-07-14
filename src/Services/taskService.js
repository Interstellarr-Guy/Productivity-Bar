import api from "../api/axios";

const taskService = {

    async getTasks(workspaceId) {

        const response =
            await api.get(`/workspaces/${workspaceId}/tasks`);

        return response.data;
    },

    async createTask(workspaceId, task) {

        const response =
            await api.post(
                `/workspaces/${workspaceId}/tasks`,
                task
            );

        return response.data;
    },

    async updateTaskStatus(taskId, status) {

    const response = await api.put(
        `/tasks/${taskId}/status`,
        { status }
    );

    return response.data;
},

    async updateTask(taskId, task) {

        const response =
            await api.put(`/tasks/${taskId}`, task);

        return response.data;
    },

    async deleteTask(taskId) {

        await api.delete(`/tasks/${taskId}`);
    }

    

};

export default taskService;