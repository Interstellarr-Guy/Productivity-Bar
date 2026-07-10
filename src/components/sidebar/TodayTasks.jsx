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

    const sortedTasks = [...tasks].sort((a, b) => {

    const order = {
        High: 0,
        Medium: 1,
        Low: 2,
    };

    return order[a.priority] - order[b.priority];

});

    const today = new Date().toISOString().split("T")[0];

const todaysTasks =
    sortedTasks.filter(task => task.dueDate === today);

const overdueTasks =
    sortedTasks.filter(task =>
        task.dueDate &&
        task.dueDate < today &&
        !task.completed
    );

const upcomingTasks =
    sortedTasks.filter(task =>
        task.dueDate > today
    );

    //Helper component 
    const renderTask = (task) => (

    <label
        key={task.id}
        className="flex items-start gap-2 p-2 cursor-pointer"
    >

        <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
        />

        <div className="flex-1">

            <div className="flex justify-between">

                <span
                    className={
                        task.completed
                            ? "line-through text-gray-500"
                            : ""
                    }
                >
                    {task.title}
                </span>

                <span
                    className={
                        task.priority === "High"
                            ? "text-red-400"
                            : task.priority === "Medium"
                            ? "text-yellow-400"
                            : "text-green-400"
                    }
                >
                    {task.priority}
                </span>

            </div>

            <p className="text-xs text-gray-500">

                {task.dueDate}

            </p>

        </div>

    </label>

);

    return (
        <div className="flex flex-col bg-[#335]">

        <div>

    <h3 className="font-semibold mb-2">

        Today's Tasks

    </h3>

    {todaysTasks.map(renderTask)}

    <hr className="my-3 border-gray-700" />

    <h3 className="font-semibold mb-2 text-red-400">

        ⚠ Overdue

    </h3>

    {overdueTasks.map(renderTask)}

    <hr className="my-3 border-gray-700" />

    <h3 className="font-semibold mb-2">

        Upcoming

    </h3>

    {upcomingTasks.map(renderTask)}

</div>

        </div>
    );
}