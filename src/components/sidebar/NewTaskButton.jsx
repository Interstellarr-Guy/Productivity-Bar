import { useState } from "react";
import taskService from "../../services/taskService";

export default function NewTaskButton({ loadTasks }) {

    const [show, setShow] = useState(false);

    const [title, setTitle] = useState("");

    const [priority, setPriority] = useState("Medium");

    const [dueDate, setDueDate] = useState("");

    const [repeatType, setRepeatType] = useState("NONE");
    
    // Fn for backend call to create  a new task
    const handleAdd = async () => {

    if (!title.trim()) return;

    try {


        await taskService.createTask({

            title,

            description: "",

            priority: priority.toUpperCase(),

            dueDate,
            
            repeatType: repeatType,

            status: "TODO"

           

        });

        await loadTasks();

        setTitle("");

        setPriority("Medium");

        setDueDate("");

        setRepeatType("NONE");

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
                 text-[#000]
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

                   <p className="text-sm font-medium text-center text-[#bc3817] mt-2 mb-1">
    Task Type..
</p>

<div className="flex gap-2">

    <label
        className={`flex-1 cursor-pointer rounded-md border text-center py-2
        transition-all duration-300
        ${
            repeatType === "NONE"
                ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                : "bg-white/5 border-white/10 hover:bg-white/10"
        }`}
    >

        <input
            type="radio"
            name="repeatType"
            value="NONE"
            checked={repeatType === "NONE"}
            onChange={(e) => setRepeatType(e.target.value)}
            className="hidden"
        />

        📄 One Time

    </label>

    <label
        className={`flex-1 cursor-pointer rounded-md border text-center py-2
        transition-all duration-300
        ${
            repeatType === "DAILY"
                ? "bg-green-500/20 border-green-400 text-green-300"
                : "bg-white/5 border-white/10 hover:bg-white/10"
        }`}
    >

        <input
            type="radio"
            name="repeatType"
            value="DAILY"
            checked={repeatType === "DAILY"}
            onChange={(e) => setRepeatType(e.target.value)}
            className="hidden"
        />

        🔁 Daily

    </label>

</div>

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