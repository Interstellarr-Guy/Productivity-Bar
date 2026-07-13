


export default function TodayTasks({
    tasks,
    setTasks,
}) {

    //debug 
    console.log("TodayTasks received:", tasks);
    console.log("Is Array?", Array.isArray(tasks));

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

    HIGH: 0,

    MEDIUM: 1,

    LOW: 2,

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
        task.status !== "COMPLETED"
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
            checked={task.status === "COMPLETED"}
            onChange={() => toggleTask(task.id)}
        />

        <div className="flex-1">

            <div className="flex justify-between">

                <span
                    className={
                        task.status === "COMPLETED"
                            ? "line-through text-gray-500"
                            : ""
                    }
                >
                    {task.title}
                </span>

                <span
                    className={
                        task.priority === "HIGH"
                            ? "text-red-400"
                            : task.priority === "MEDIUM"
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