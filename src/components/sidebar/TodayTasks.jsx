import taskService from "../../services/taskService";
import {useState}  from "react";
import HoursWorkedModal from "./HoursWorkedModal";


export default function TodayTasks({
    tasks,
    setTasks,
    loadTasks,
    saveHours,
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

    if (hours < 0 || hours > 12) {
        alert("Hours must be between 0 and 12");
        return;
    }

    await taskService.updateTask(selectedTask.id, {
        title: selectedTask.title,
        description: selectedTask.description,
        status: selectedTask.status,
        priority: selectedTask.priority,
        dueDate: selectedTask.dueDate,
        workedHours: hours,
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
}       else {
     
       const today =
       new Date().toISOString().split("T")[0]; 

       const currentHours =
       productivityData[today] || 0;

       const updatedHours =
       Math.max(
        currentHours - task.workedHours,
        0);

       saveHours(today, updatedHours);
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
        <div className="p-1 flex flex-col bg-[#335]">

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