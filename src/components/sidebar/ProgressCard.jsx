export default function ProgressCard({ tasks }) {

    const today =
        new Date().toISOString().split("T")[0];

    const todayTasks =
        tasks.filter(
            task => task.dueDate === today
        );

    const completedTasks =
        todayTasks.filter(
            task => task.status === "DONE"
        ).length;

    const totalTasks =
        todayTasks.length;

    const percentage =
        totalTasks === 0
            ? 0
            : Math.round(
                  (completedTasks / totalTasks) * 100
              );

    return (

        <div className="bg-[#d14927] p-3 mb-2">

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