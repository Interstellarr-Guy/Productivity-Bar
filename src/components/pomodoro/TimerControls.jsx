export default function TimerControls({
    running,
    setRunning,
    mode,
    setMode,
    setSeconds,
}) {

    return (
        <>

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
    className="w-full mt-2 py-2 rounded bg-yellow-600 hover:bg-yellow-700"
>
       Skip Session
    </button>

        </>
    );

}