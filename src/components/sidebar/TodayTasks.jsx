import taskService from "../../services/taskService";
import guestTaskService from "../../services/guestTaskService";
import { isGuest } from "../../Utils/storageMode";
import { useState } from "react";
import HoursWorkedModal from "./HoursWorkedModal";



export default function TodayTasks({
    tasks,
    setTasks,
    loadTasks,
    productivityData,
    guestMode, 
}) {
     
    const [showHoursModal, setShowHoursModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [hoursInput, setHoursInput] = useState("");
      
    //Check if guest mode
    const activeTaskService = guestMode
    ? guestTaskService
    : taskService;

     //handleSaveHours
    const handleSaveHours = async () => {

    const hours = Number(hoursInput);

    const minutes = hours * 60;

    const completedDate =
        new Date().toISOString().split("T")[0];


    if (isGuest()) {

        await guestTaskService.completeTask(
            selectedTask.id,
            {
                workedMinutes: minutes,
                completedDate: completedDate
            }
        );

    } else {

       await activeTaskService.completeTask(selectedTask.id, {
    workedMinutes: minutes,
    completedDate: new Date().toISOString().split("T")[0],
});

    }


    await loadTasks();

    setShowHoursModal(false);
    setHoursInput("");
    setSelectedTask(null);
};
    
    // Fn to toggle task status b/w TODO and DONE
   const toggleTask = async (task) => {

    try {

        // -----------------------------
        // UNCHECK COMPLETED TASK
        // -----------------------------

        if (task.status === "DONE") {

            if (isGuest()) {

                await guestTaskService.undoCompletion(
                    task.id,
                    task.completedDate
                );

            } else {

                await taskService.updateTaskStatus(
                    task.id,
                    "TODO"
                );

            }

            await loadTasks();

            return;
        }


        // -----------------------------
        // CHECK TODO TASK
        // -----------------------------

        setSelectedTask(task);
        setHoursInput("");
        setShowHoursModal(true);


    } catch (error) {

        console.error(
            "Failed to update task",
            error
        );

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
        <div className="p-2 flex flex-col  bg-white/5 backdrop-blur-xl rounded">

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