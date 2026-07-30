


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

    //prod map
    const productivityMap = {};

    heatmapData.forEach(day => {

    productivityMap[day.date] = day.minutes;

});  

   const months = [
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul"
];

   const weekDays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
];

    //refernce code
//     {heatmapData.map((day) => (

//                 <div
//                     key={day.date}
//                     className={`w-5 h-5 rounded ${
//             day.minutes === 0
//         ? "bg-gray-800"
//         : day.minutes < 60
//         ? "bg-green-900"
//         : day.minutes < 120
//         ? "bg-green-700"
//         : day.minutes < 240
//         ? "bg-green-500"
//         : "bg-green-300"
// }`}
//                     title={`${date} - ${minutes} min`}
//                 />

//             ))}

    return ( 
        
<div className="flex">
        {/* day labels */}
    <div
    className="
        grid grid-rows-7 gap-1 mr-2 text-xs text-gray-400
    "
>

    {weekDays.map(day => (

        <div key={day}
        className="h-3 flex items-center"
        >
            {day}
        </div>

    ))}

</div>

        {/* Month Labels + Grid */}
<div>
   

   <div className="flex text-xs text-gray-400 ">

    {months.map(month => (

        <div
            key={month}
            className="w-16"
        >
            {month}
        </div>

    ))}

    </div>
  
  
  <div className="grid grid-flow-col grid-rows-7 gap-1 w-max ">
    
            {allDays.map( date => {
            
            const minutes = productivityMap[date] || 0;

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
        </div>


        </div>

    );

}