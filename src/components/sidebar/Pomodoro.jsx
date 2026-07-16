import { useEffect, useState } from "react";
import TimerDisplay from "../pomodoro/TimerDisplay";
import TimerControls from "../pomodoro/TimerControls";
import SessionInfo from "../pomodoro/SessionInfo";
import TaskSelectionModal from "../pomodoro/TaskSelectionModal";
import taskService from "../../services/taskService";

export default function PomodoroCard({tasks, loadTasks}) {



const saved = JSON.parse(localStorage.getItem("pomodoro"));

const [seconds, setSeconds] = useState(
    saved?.seconds ?? 25 * 60
);

const [running, setRunning] = useState(
    saved?.running ?? false
);

const [mode, setMode] = useState(
    saved?.mode ?? "focus"
);

const [sessions, setSessions] = useState(
    saved?.sessions ?? 0
);

const [showTaskModal, setShowTaskModal] =
    useState(false);

    useEffect(() => {

    if ("Notification" in window) {

        Notification.requestPermission();

    }
}, []);

    useEffect(() => {

    localStorage.setItem(
        "pomodoro",

        JSON.stringify({

            seconds,
            running,
            mode,
            sessions

        })

    );

}, [

    seconds,
    running,
    mode,
    sessions

]); 

    useEffect(() => {

        if (!running) return;

        const timer = setInterval(() => {

            setSeconds(prev => {

                if (prev <= 1) {

        if (mode === "focus") {

        setRunning(false);

        setShowTaskModal(true);

        return 0;

}

else {

    setMode("focus");
    return 25 * 60;

}

    return 0;

}

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(timer);

    }, [running, mode]);

   // const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");

   // const secs = String(seconds % 60).padStart(2, "0");

   const handleTaskSelected = async (task) => {

    const today = new Date().toISOString().split("T")[0];

    await taskService.updateTask(task.id, {

        title: task.title,
        description: task.description,
        status: "DONE",
        priority: task.priority,
        dueDate: task.dueDate,

        workedMinutes: task.workedMinutes + 25,

        completedDate: today,

    });

    await loadTasks();

    setShowTaskModal(false);

    setMode("break");

    setSeconds(5 * 60);

    setRunning(true);

};

    return (
    <div className="bg-[#342] border border-[#1f2937] p-3 mb-4 rounded">

        <TimerDisplay
            mode={mode}
            seconds={seconds}
        />

        <TimerControls
            running={running}
            setRunning={setRunning}
            setMode={setMode}
            setSeconds={setSeconds}
        />
         <SessionInfo
           sessions={sessions}
           mode={mode}
/>
        {showTaskModal && (

       <TaskSelectionModal
       tasks={tasks}
       onSelect={handleTaskSelected}
       onCancel={() => setShowTaskModal(false)}
/>

)}

    </div>
);

}