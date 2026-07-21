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

const [endTime, setEndTime] = useState(
    saved?.endTime ?? null
);    

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
            sessions,
            endTime,

        })

    );

}, [

    seconds,
    running,
    mode,
    sessions,
    endTime,

]); 
 
    useEffect(() => {

    if (!running || !endTime) return;

    const timer = setInterval(() => {

        const remaining = Math.max(
            0,
            Math.ceil((endTime - Date.now()) / 1000)
        );

        setSeconds(remaining);

        if (remaining === 0) {

            clearInterval(timer);
        
        if (Notification.permission === "granted") {

        new Notification(

            mode === "focus"
                ? "🎯 Focus session completed!"
                : "☕ Break finished!",

            {
                body:
                    mode === "focus"
                        ? "Select the task you worked on."
                        : "Time to get back to work!"
            }

        );

    }

            if (mode === "focus") {
                document.title =
                  mode === "focus"
                  ? "✅ Focus Complete!"
                  : "☕ Break Finished!";
                setRunning(false);
                setShowTaskModal(true);

            } else {

                const nextMode =
                    mode === "break"
                        ? "focus"
                        : "focus";

                const nextSeconds =
                    nextMode === "focus"
                        ? 25 * 60
                        : 5 * 60;

                setMode(nextMode);
                setSeconds(nextSeconds);
                setEndTime(null);
                setRunning(true);

            }

        }

    }, 250);

    return () => clearInterval(timer);

}, [running, endTime, mode]);
    
    useEffect(() => {

    if (running) {

        document.title =
            `${Math.floor(seconds / 60)
                .toString()
                .padStart(2, "0")}:${(seconds % 60)
                .toString()
                .padStart(2, "0")} - Productivity Tracker`;

    } else {

        document.title = "Productivity Tracker";

    }

    return () => {

        document.title = "Productivity Tracker";

    };

}, [seconds, running]);
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

    // setShowTaskModal(false);
    // setMode("break");
    // setSeconds(5 * 60);
    // setRunning(true);
    setShowTaskModal(false);

   const nextSessions = sessions + 1;

   setSessions(nextSessions);

   if (nextSessions % 4 === 0) {

    setMode("longBreak");
    setSeconds(15 * 60);

   } else {

    setMode("break");
    setSeconds(5 * 60);

}

   setEndTime(Date.now() +
    (nextSessions % 4 === 0 ? 15 : 5) * 60 * 1000);

  setRunning(true);

};

    return (
    <div className="bg-[#342]  p-3 mb-1 ">

        <TimerDisplay
            mode={mode}
            seconds={seconds}
        />
        
        <TimerControls
            running={running}
            setRunning={setRunning}
            setMode={setMode}
            seconds={seconds}
            setSeconds={setSeconds}
            endTime={endTime}
            setEndTime={setEndTime}
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