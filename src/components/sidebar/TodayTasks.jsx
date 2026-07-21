import taskService from "../../services/taskService";
import {useState}  from "react";
import HoursWorkedModal from "./HoursWorkedModal";


export default function TodayTasks({
    tasks,
    setTasks,
    loadTasks,
    productivityData, 
}) {
     
    const [showHoursModal, setShowHoursModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [hoursInput, setHoursInput] = useState("");

    //debug 
  //  console.log("TodayTasks received:", tasks);
  //  console.log("Is Array?", Array.isArray(tasks));

     //handleSaveHours
     const handleSaveHours = async () => {

    const hours = Number(hoursInput);

    const minutes = hours * 60;

    await taskService.updateTask(selectedTask.id, {
      title: selectedTask.title,
      description: selectedTask.description,
      status: "DONE",
      priority: selectedTask.priority,
      dueDate: selectedTask.dueDate,

      workedMinutes: minutes,

      completedDate: new Date().toISOString().split("T")[0],
});

    await loadTasks();

    setShowHoursModal(false);
    setHoursInput("");
    setSelectedTask(null);
};
    
    // Fn to toggle task status b/w TODO and DONE
    const toggleTask = async (task) => {

    try {
            const newStatus =
            task.status === "DONE"
                ? "TODO"
                : "DONE";
        await taskService.updateTaskStatus(
            task.id,
            newStatus
        );

        if (newStatus === "DONE") {
          setSelectedTask(task);
          setHoursInput("");
          setShowHoursModal(true);
}       

       await loadTasks();   

    } catch (error) {

        console.error("Failed to update task", error);

    }

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
        task.status !== "DONE"
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
            checked={task.status === "DONE"}
            onChange={() => toggleTask(task)}
        />

        <div className="flex-1">

            <div className="flex justify-between">

                <span
                    className={
                        task.status === "DONE"
                            ? "line-through text-gray-500"
                            : ""
                    }
                >
                    {task.title} 
                </span>

                <span
                    className={
                        task.priority === "HIGH"
                            ? "text-red-400 "
                            : task.priority === "MEDIUM"
                            ? "text-yellow-400"
                            : "text-green-400"
                    }
                >
                     - {task.priority}
                </span>

            </div>

            <p className="text-xs text-gray-500">

                {task.dueDate}

            </p>

        </div>

    </label>

);

    return (
        <div className="p-1 flex flex-col bg-[#334]">

        <div>

    <h5 className="font-semibold mb-1 justify-center flex">

        Today's Tasks

    </h5>

    {todaysTasks.map(renderTask)}

    <hr className="my-1 border-gray-700" />

    <h5 className="font-semibold mb-1 text-red-400 justify-center flex">

        ⚠ Overdue

    </h5>

    {overdueTasks.map(renderTask)}

    <hr className="my-1 border-gray-700" />

    <h5 className="font-semibold mb-1 justify-center flex">

        Upcoming

    </h5>

    {upcomingTasks.map(renderTask)}

</div>
  
  {showHoursModal && (
    <HoursWorkedModal
        task={selectedTask}
        hoursInput={hoursInput}
        setHoursInput={setHoursInput}
        onSave={handleSaveHours}
        onCancel={() => {
          setShowHoursModal(false);
          setHoursInput("");
          setSelectedTask(null);
}}
    />
)}

        </div>
    );
}