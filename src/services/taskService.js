import api from "../api/axios";
import guestTaskService from "./guestTaskService";
import { isGuest } from "../Utils/storageMode";

const taskService = {

    async getTasks() {

    if (isGuest()) {

        return guestTaskService.getTasks();

    }

    const workspaceId =
        localStorage.getItem("workspaceId");

    const response =
        await api.get(`/workspaces/${workspaceId}/tasks`);

    return response.data;
},

    async createTask(task) {

    if (isGuest()) {

        return guestTaskService.addTask(task);

    }

    const workspaceId =
        localStorage.getItem("workspaceId");

    const response =
        await api.post(
            `/workspaces/${workspaceId}/tasks`,
            task
        );

    return response.data;
},

    async updateTaskStatus(taskId, status) {

    if (isGuest()) {

        return guestTaskService.updateTaskStatus(taskId, status);

    }

    const response = await api.put(
        `/tasks/${taskId}/status`,
        { status }
    );

    return response.data;
},

    async updateTask(taskId, task) {

    if (isGuest()) {
        return guestTaskService.updateTask({
            ...task,
            id: taskId,
        });
    }

    const response =
        await api.put(`/tasks/${taskId}`, task);

    return response.data;
},

async deleteTask(taskId) {

    if (isGuest()) {

        return guestTaskService.deleteTask(taskId);

    }

    await api.delete(`/tasks/${taskId}`);
},
    // Completed Task
    async completeTask(taskId, completion) {

    if (isGuest()) {

        return guestTaskService.completeTask(taskId, completion);

    }

    const response = await api.post(
        `/tasks/${taskId}/complete`,
        completion
    );

    return response.data;
},

    

};

export default taskService;