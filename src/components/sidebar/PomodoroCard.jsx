import { useEffect, useState } from "react";

export default function PomodoroCard() {

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

    if (Notification.permission === "granted") {

        new Notification("☕ Break Time", {
            body: "Great job! Take a 5 minute break."
        });

    }

    setMode("break");
    //setSeconds(5 * 60);
    setSessions(s => s + 1);

    return 5*60;

}
       
    else {

    if (Notification.permission === "granted") {

        new Notification("🎯 Focus Time", {
            body: "Break finished. Let's work!"
        });

    }

    setMode("focus");
    //setSeconds(25 * 60);
    return 25*60;
}

    return 0;

}

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(timer);

    }, [running, mode]);

    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");

    const secs = String(seconds % 60).padStart(2, "0");

    return (

      <div className="bg-[#342] border border-[#1f2937] p-3 mb-4 rounded">
        <p className="text-center text-green-400 font-semibold">

             {mode === "focus"
             ? "🎯 Focus Time"
             : "☕ Break Time"}

        </p>
        <p className="text-center text-2xl font-bold">

                {minutes}:{secs}

        </p>

            <button

                onClick={() => setRunning(!running)}

                className="mt-3 w-full bg-[#16a34a] hover:bg-green-700 py-2 rounded"

            >

                {running ? "Pause" : "Start Focus"}

            </button>

            <button

            onClick={() => {

            setRunning(false);

            setMode("focus");

            setSeconds(25 * 60);

        }}

          className="w-full mt-2 py-2 rounded bg-gray-700 hover:bg-gray-600"

>
          Reset

        </button>

        </div>

    );

}