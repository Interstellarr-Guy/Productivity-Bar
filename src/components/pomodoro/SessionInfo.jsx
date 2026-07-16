export default function SessionInfo({

    sessions,
    mode,

}) {

    return (

        <div className="mt-4 space-y-2 text-sm">

            <div className="flex justify-between">

                <span>🎯 Focus Time</span>

                <span>25 min</span>

            </div>

            <div className="flex justify-between">

                <span>☕ Break Time</span>

                <span>5 min</span>

            </div>

            <div className="flex justify-between">

                <span>📈 Sessions Today</span>

                <span>{sessions}</span>

            </div>

            <div className="flex justify-between">

                <span>Current Mode</span>

                <span>

                    {mode === "focus"
                        ? "🎯 Focus"
                        : "☕ Break"}

                </span>

            </div>

        </div>

    );

}