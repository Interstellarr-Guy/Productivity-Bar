


export default function HoursWorkedModal({
    task,
    hoursInput,
    setHoursInput,
    onSave,
    onCancel,

}) {

    //console.log("Modal onSave:", onSave);

    return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="w-80 rounded-xl bg-[#2f3542] p-5 shadow-xl">

            <h2 className="text-lg font-semibold text-white">
                Hours Worked
            </h2>

            <p className="text-sm text-gray-400 mt-1">
                {task.title}
            </p>

            <input
                type="number"
                min="0"
                max="12"
                autoFocus
                value={hoursInput}
                onChange={(e)=>setHoursInput(e.target.value)}
                className="
                    mt-4
                    w-full
                    rounded
                    bg-[#444]
                    p-3
                    text-white
                    border
                    border-gray-600
                    focus:border-green-500
                    outline-none
                "
            />

            <div className="flex justify-end gap-2 mt-5">

                <button
                    onClick={onCancel}
                    className="px-4 py-2 rounded bg-gray-600"
                >
                    Cancel
                </button>

                <button
                    onClick={onSave}
                    className="px-4 py-2 rounded bg-green-600"
                >
                    Save
                </button>

            </div>

        </div>

    </div>
);
}