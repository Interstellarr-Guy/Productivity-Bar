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
             <div className="flex justify-center mb-1">

             
            <button
                onClick={() => setShow(true)}
                className="
                 w-full
                 mt-1

                 py-1
                 lg:py-2
                 rounded
               bg-[#16a34a]
               hover:bg-[#15803d]
                 transition-colors
                 font-medium
                 text-sm
                 lg:text-base
                "
            >
                + New Task
            </button>
            </div>

            {show && (

                <div className="
                   bg-white/5
                     rounded
                     p-3
                     mb-2
                     space-y-2
">

                    <input
                        className="
                    w-full
                    p-2
                    rounded
                    bg-[#333]
                    text-sm
                    focus:outline-none
                    focus:ring-1
                    focus:ring-green-500
                    mb-2
"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <select
                        className="
                    w-full
                    p-2
                    rounded
                    bg-[#333]
                    text-sm
                    focus:outline-none
                    focus:ring-1
                    focus:ring-green-500
                    mb-2
"
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
                        className="
                    w-full
                    p-2
                    rounded
                    bg-[#333]
                    text-sm
                    focus:outline-none
                    focus:ring-1
                    focus:ring-green-500
                    mb-2
"
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