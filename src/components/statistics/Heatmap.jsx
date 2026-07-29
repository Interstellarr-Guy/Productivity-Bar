


export default function Heatmap({ heatmapData }) {
     
    const allDays = [];

    const today = new Date();

    for (let i = 364; i >= 0; i--) {

    const date = new Date(today);

    date.setDate(today.getDate() - i);

    allDays.push(date.toISOString().split("T")[0]);
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
  <div>
    <h3 className="text-lg font-semibold text-white mb-3 text-center">
    GitHub Heatmap
    </h3>

   <div className="flex text-xs text-gray-400 mb-2">

    {months.map(month => (

        <div
            key={month}
            className="w-16"
        >
            {month}
        </div>

    ))}

    </div>

  <div className="grid grid-flow-col grid-rows-7 gap-1 w-max ml-2">
    
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

    );

}