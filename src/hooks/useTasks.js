import { useEffect, useState } from "react";
import taskService from "../services/taskService";

export default function useTasks() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        loadTasks();

    }, []);

    const loadTasks = async () => {

        try {

            const workspaceId =
                localStorage.getItem("workspaceId");

            if (!workspaceId) return;

            const data =
                await taskService.getTasks(workspaceId);

            setTasks(data);

        } catch (error) {

            console.error("Failed to load tasks", error);

        }

    };

    return {

        tasks,
        setTasks,
        loadTasks,

    };

}