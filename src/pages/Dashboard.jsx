import { useEffect, useState } from "react";
import Calendar from "../pages/Calendar";
import taskService from "../services/taskService";

export default function Dashboard() {

    const [tasks, setTasks] = useState([]);

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

    useEffect(() => {

        loadTasks();

    }, []);

    //debug 
    console.log("Dashboard tasks:", tasks);
console.log("Is Array?", Array.isArray(tasks));
    return (

        <Calendar
            tasks={tasks}
            setTasks={setTasks}
            loadTasks={loadTasks}
        />

    );

}