import CircularTimer from "./CircularTimer";


export default function TimerDisplay({ mode, seconds }) {

    const minutes = String(
        Math.floor(seconds / 60)
    ).padStart(2, "0");

    const secs = String(
        seconds % 60
    ).padStart(2, "0");

    const totalSeconds =
    mode === "focus"
    ? 25 * 60
    : mode === "break"
    ? 5 * 60
    : 15 * 60;
    
    

    // const progress = seconds / totalSeconds;

    // const radius = 45;

    // const circumference =
    // 2 * Math.PI * radius;

    // const strokeDashoffset =
    // circumference * (1 - progress);

    const ringColor =
      mode === "focus"
      ? "#22c55e"
      : mode === "break"
      ? "#3b82f6"
      : "#a855f7";

    return (
        <>
            <div className="flex justify-center items-center mb-3">

    <CircularTimer

        seconds={seconds}

        totalSeconds={
            mode === "focus"
                ? 25 * 60
                : mode === "break"
                ? 5 * 60
                : 15 * 60
        }
        ringColor={ringColor}
    />

</div>
            <p className="text-center text-green-400 font-semibold">

                {mode === "focus"
                      ? "🎯 Focus Time"
                      : mode === "break"
                      ? "☕ Break Time"
                      : "🌴 Long Break"}

            </p>

            <p className="text-center text-2xl font-bold">

                {minutes}:{secs}

            </p>

        </>
    );

}