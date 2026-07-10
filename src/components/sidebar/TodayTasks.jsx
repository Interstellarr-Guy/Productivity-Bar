export default function TodayTasks({
    tasks,
    setTasks,
}) {
    const toggleTask = (id) => {
        setTasks(
            tasks.map(task =>
                task.id === id
                    ? {
                          ...task,
                          completed: !task.completed,
                      }
                    : task
            )
        );
    };

    return (
        <div className="flex flex-col bg-[#335]">

        {tasks.map(task => (

        <div
            key={task.id}
            className="flex items-center justify-between p-2">

        <label className="flex items-center gap-2">

        <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
        />

        <span
            className={
                task.completed
                    ? "line-through text-gray-500"
                    : ""
            }
        >
            {task.title}
        </span>

    </label>

    <button
        onClick={() =>
            setTasks(
                tasks.filter(
                    t => t.id !== task.id
                )
            )
        }
        className="text-red-500 hover:text-red-300"
    >
        🗑
    </button>

    </div>

            ))}

        </div>
    );
}