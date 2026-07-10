import { useState } from "react";

export default function NewTaskButton({
    tasks,
    setTasks,
}) {

    const [showInput, setShowInput] = useState(false);
    const [taskName, setTaskName] = useState("");

    const addTask = () => {

        if (taskName.trim() === "") return;

        const newTask = {

            id: Date.now(),
            title: taskName,
            completed: false,

        };

        setTasks([...tasks, newTask]);

        setTaskName("");
        setShowInput(false);

    };

    return (

        <div className="p-3">

            {!showInput ? (

                <button
                    onClick={() => setShowInput(true)}
                    className="bg-[#16a34a] w-full py-2 rounded-lg text-white"
                >
                    + New Task
                </button>

            ) : (

                <div className="flex flex-col gap-2">

                    <input
                        type="text"
                        placeholder="Task name..."
                        value={taskName}
                        onChange={(e) =>
                            setTaskName(e.target.value)
                        }
                        className="bg-[#222] text-white border border-gray-600 rounded p-2"
                    />

                    <button
                        onClick={addTask}
                        className="bg-green-600 rounded py-2"
                    >
                        Add
                    </button>

                    <button
                        onClick={() => {

                            setTaskName("");
                            setShowInput(false);

                        }}
                        className="bg-gray-700 rounded py-2"
                    >
                        Cancel
                    </button>

                </div>

            )}

        </div>

    );
}