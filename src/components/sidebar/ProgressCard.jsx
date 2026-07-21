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

        <div className="bg-[#d14927] pt-1 pl-2 pr-2 mb-1">

            <p className="font-semibold">
                Today's Progress
            </p>

            <div className="mt-0 w-full h-2 bg-gray-700 rounded">

                <div
                    className="h-full bg-green-500 rounded"
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>
             
             <div className="flex justify-between">
               <p className="">
                {completedTasks} / {totalTasks} Tasks
            </p>

            <p className="">
                {percentage}%
            </p>
             </div>
            

        </div>

    );
}