export default function TimerControls({
    running,
    setRunning,
    mode,
    setMode,
    seconds,
    setSeconds,
    endTime,
    setEndTime,
}) {

    return (
        <>
        <div className="flex gap-2">

        
        <button
          onClick={() => {
            if (!running) {

            if (!endTime) {

            setEndTime(
                Date.now() + seconds * 1000
            );

              }

             setRunning(true);

            } else {

            setRunning(false);

            }

    }}
                className="mt-1 w-full bg-[#16a34a] hover:bg-green-700 py-1.2 text-sm rounded"
            >
                {running ? "Pause" : "Start Focus"}
            </button>

            <button
                onClick={() => {

                    setRunning(false);
                    setMode("focus");
                    setSeconds(25 * 60);
                    setEndTime(null);

                }}
                className="w-full mt-1 py-1.2 rounded bg-gray-700 hover:bg-gray-600"
            >
                Reset
            </button>
            </div>
            <button
    onClick={() => {

        if (mode === "focus") {
            setMode("break");
            setSeconds(5 * 60);
        } else {
            setMode("focus");
            setSeconds(25 * 60);
        }

        setRunning(false);

       }}
    className="w-full mt-1 py-1.2 rounded bg-yellow-600 hover:bg-yellow-700"
>
       Skip Session
    </button>

        </>
    );

}