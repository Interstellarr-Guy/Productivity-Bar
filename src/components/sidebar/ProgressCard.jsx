export default function TodayProgress({ productivityData }) {

    const today =
        new Date().toISOString().split("T")[0];

    // Productivity data is stored in hours
    const todayHours =
        productivityData[today] || 0;

    // Maximum daily target = 12 hours
    const progressPercent =
        Math.min((todayHours / 12) * 100, 100);

    return (
        <div className="bg-white/5 backdrop-blur-xl rounded p-3 mb-2">

            <div className="flex justify-between items-center mb-1">

                <h6 className="font-semibold">
                    Today's Progress
                </h6>

                <span className="text-sm text-gray-400">
                    {todayHours.toFixed(1)}h / 12h
                </span>

            </div>

            <div className="w-full bg-gray-700 rounded-full h-3">

                <div
                    className="bg-green-500 h-3 rounded transition-all duration-500"
                    style={{
                        width: `${progressPercent}%`
                    }}
                />

            </div>

            <p className="text-xs text-gray-500 mt-1 text-center">
              <span className="text-[#87d20f]">{progressPercent.toFixed(0)}%</span>   completed
            </p>

        </div>
    );
}