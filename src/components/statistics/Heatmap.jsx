


export default function Heatmap({ heatmapData }) {
     
    const allDays = [];

const today = new Date();

const startDate = new Date(today);

startDate.setDate(today.getDate() - 364);

// Find Monday of that week
const dayOfWeek = startDate.getDay();

// JS:
// Sunday = 0
// Monday = 1
// ...

const diff = dayOfWeek === 0
    ? -6
    : 1 - dayOfWeek;

startDate.setDate(startDate.getDate() + diff);

// Build every day until today
const current = new Date(startDate);

while (current <= today) {

    allDays.push(current.toISOString().split("T")[0]);

    current.setDate(current.getDate() + 1);

}

   // Convert 365 days into weeks (7 days per column)

const weeks = [];

for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
} 
   
   

    //prod map
    const productivityMap = {};

    heatmapData.forEach(day => {

    productivityMap[day.date] = day.minutes;

});  


   const weekDays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
];   
    //Month labels
   const monthLabels = [];

weeks.forEach((week) => {

    let label = "";

    for (const date of week) {

        const currentDate = new Date(date);

        // Is this the first day of a month?
        if (currentDate.getDate() === 1) {

            label = currentDate.toLocaleString("default", {
                month: "short",
            });

            break;
        }
    }

    monthLabels.push(label);

}); 
  // debug
   console.log(monthLabels);

  return (

<div>

    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
        🔥 Activity History
    </h2>

    {/* Parent Grid */}

    <div
    className="
        grid
        grid-cols-[auto_1fr]
        grid-rows-[auto_auto]
        gap-x-3
        gap-y-2
    "
>

    {/* Cell 1: empty*/}
    <div></div>

    {/* Cell 2: Month */}
    <div className="flex gap-1 mb-2">

    {monthLabels.map((month, index) => (

        <div
            key={index}
            className="w-3 text-[10px] text-gray-400 overflow-visible"
        >
            {month}
        </div>

    ))}

    </div>

    {/* Cell 3 */}
    <div className="flex flex-col gap-1">

    {weekDays.map(day => (

        <div
            key={day}
            className="w-6 h-3 text-[10px] text-gray-400"
            style={{
                lineHeight: "12px"
            }}
        >
            {day}
        </div>

    ))}

    </div>

    {/* Cell 4 */}
    <div className="flex gap-1">

    {weeks.map((week, weekIndex) => (

        <div
            key={weekIndex}
            className="flex flex-col gap-1"
        >

            {week.map(date => {

                const minutes =
                    productivityMap[date] || 0;

                return (

                    <div
                        key={date}
                        className={`w-3 h-3 rounded-sm ${
                            minutes === 0
                                ? "bg-gray-800"
                                : minutes < 60
                                ? "bg-green-900"
                                : minutes < 120
                                ? "bg-green-700"
                                : minutes < 240
                                ? "bg-green-500"
                                : "bg-green-300"
                        }`}
                        title={`${date} - ${minutes} min`}
                    />

                );

            })}

        </div>

    ))}

    </div>

    <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-400">

    <span>Less</span>

    <div className="w-3 h-3 rounded-sm bg-gray-800"></div>

    <div className="w-3 h-3 rounded-sm bg-green-900"></div>

    <div className="w-3 h-3 rounded-sm bg-green-700"></div>

    <div className="w-3 h-3 rounded-sm bg-green-500"></div>

    <div className="w-3 h-3 rounded-sm bg-green-300"></div>

    <span>More</span>

</div>

</div>

</div>

);
}