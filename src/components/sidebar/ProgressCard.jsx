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

        <div className="bg-white/7 
                          backdrop-blur-xl 
                          rounded 
                          p-2 mb-1">

            <p className="font-semibold text-sm lg:text-base">
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
             
             <div className="flex justify-between
                               items-center
                               mt-2
                               text-xs
                               lg:text-sm
                               text-gray-300">
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