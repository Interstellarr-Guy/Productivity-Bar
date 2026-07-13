import { useState } from "react";
import taskService from "../../services/taskService";

export default function NewTaskButton({ loadTasks }) {

    const [show, setShow] = useState(false);

    const [title, setTitle] = useState("");

    const [priority, setPriority] = useState("Medium");

    const [dueDate, setDueDate] = useState("");
    
    // Fn for backend call to create  a new task
    const handleAdd = async () => {

    if (!title.trim()) return;

    try {

        const workspaceId =
            localStorage.getItem("workspaceId");

        await taskService.createTask(workspaceId, {

            title,

            description: "",

            priority: priority.toUpperCase(),

            dueDate,

            status: "TODO",

        });

        await loadTasks();

        setTitle("");

        setPriority("Medium");

        setDueDate("");

        setShow(false);

    } catch (error) {

        console.error(error);

        alert("Failed to create task");

    }

};

    return (

        <>

            <button
                onClick={() => setShow(true)}
                className="bg-[#16a34a] w-full py-2 rounded mb-4"
            >
                + New Task
            </button>

            {show && (

                <div className="bg-[#222] p-3 rounded mb-4">

                    <input
                        className="w-full mb-2 p-2 bg-[#333]"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <select
                        className="w-full mb-2 p-2 bg-[#333]"
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)
                        }
                    >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>

                    <input
                        type="date"
                        className="w-full mb-2 p-2 bg-[#333]"
                        value={dueDate}
                        onChange={(e) =>
                            setDueDate(e.target.value)
                        }
                    />

                    <button
                        onClick={handleAdd}
                        className="bg-green-600 w-full py-2 rounded"
                    >
                        Save Task
                    </button>

                </div>

            )}

        </>

    );

}