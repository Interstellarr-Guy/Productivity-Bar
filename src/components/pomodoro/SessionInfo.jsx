export default function SessionInfo({

    sessions,
    mode,

}) {

    return (

        <div className="mt-3 space-y-2 text-xs">

            

            

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