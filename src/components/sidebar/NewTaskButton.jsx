import { useState } from "react";

export default function NewTaskButton({ addTask }) {

    const [show, setShow] = useState(false);

    const [title, setTitle] = useState("");

    const [priority, setPriority] = useState("Medium");

    const [dueDate, setDueDate] = useState("");

    const handleAdd = () => {

        if (!title.trim()) return;

        addTask(
            title,
            priority,
            dueDate
        );

        setTitle("");
        setPriority("Medium");
        setDueDate("");

        setShow(false);

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