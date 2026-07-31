export default function StatisticsCard({ statistics }) {

    const formatMinutes = (minutes) => {

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        return `${hours}h ${mins}m`;

    };

    return (

        <div className="bg-[#95a4ba] rounded-lg p-4 
                        border border-gray-700">

            <h2 className="text-lg font-bold mb-4">
                📊 Productivity Statistics
            </h2>

            <div className="space-y-3">

                <div className="flex justify-between">
                    <span>Today</span>
                    <span>{formatMinutes(statistics.todayMinutes)}</span>
                </div>

                <div className="flex justify-between">
                    <span>This Week</span>
                    <span>{formatMinutes(statistics.weekMinutes)}</span>
                </div>

                <div className="flex justify-between">
                    <span>This Month</span>
                    <span>{formatMinutes(statistics.monthMinutes)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Completed Tasks</span>
                    <span>{statistics.completedTasks}</span>
                </div>

                <div className="flex justify-between">
                    <span>🔥 Current Streak</span>
                    <span>{statistics.currentStreak} Days</span>
                </div>

            </div>

        </div>

    );

}