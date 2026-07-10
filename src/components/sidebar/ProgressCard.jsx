export default function ProgressCard({ tasks }) {

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    const totalTasks = tasks.length;

    const percentage =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

    return (
        <div className="bg-[#d14927] p-3 mb-3">

            <p className="font-semibold">
                Today's Progress
            </p>

            <div className="mt-2 w-full h-2 bg-gray-700 rounded">

                <div
                    className="h-full bg-green-500 rounded"
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

            <p className="mt-2">
                {completedTasks} / {totalTasks} Tasks
            </p>

            <p>
                {percentage}%
            </p>

        </div>
    );
}