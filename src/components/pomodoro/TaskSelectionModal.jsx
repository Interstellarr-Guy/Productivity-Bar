export default function TaskSelectionModal({
    tasks,
    onSelect,
    onCancel,
}) {

    const todoTasks = tasks.filter(
        task => task.status === "TODO"
    );

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-[#2f3542] w-96 rounded-xl p-5">

                <h2 className="text-xl font-bold mb-4">
                    🎯 Focus Session Complete
                </h2>

                <p className="text-gray-400 mb-4">
                    What did you work on?
                </p>

                <div className="max-h-64 overflow-y-auto space-y-2">

                    {todoTasks.map(task => (

                        <button
                            key={task.id}
                            onClick={() => onSelect(task)}
                            className="w-full text-left p-3 rounded bg-[#3b4252] hover:bg-[#4c566a]"
                        >
                            {task.title}
                        </button>

                    ))}

                </div>

                <button
                    onClick={onCancel}
                    className="w-full mt-4 bg-gray-600 py-2 rounded"
                >
                    Cancel
                </button>

            </div>

        </div>

    );

}