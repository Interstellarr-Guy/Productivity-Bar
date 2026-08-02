import {generateMonthDates,getFirstDay,} from "../Utils/CalendarUtils";
import DayCell from "./DayCell";

export default function CalendarGrid({ year, month, productivityData, onDayClick }) {

  const dates = generateMonthDates(year, month);

  const firstDay = getFirstDay(year, month);

  const cells = [
    ...Array(firstDay).fill(null),
    ...dates,
  ];

    // Update for 7 rows to all days in month
    const remainingCells = 42 - cells.length;

  const fullCalendar = [
  ...cells,
  ...Array(remainingCells).fill(null),
  ];

    

  return (
    <div className="cg grid grid-cols-7 h-full   
                    text-[#e7dee5] 
    ">

      {fullCalendar.map((cell, index) => {

    
    const dateKey =
`${year}-${String(month + 1).padStart(2, "0")}-${String(cell).padStart(2, "0")}`;

      return cell === null ? (
    <div
      key={index}
      className=""
    />
  ) : (
    <DayCell
      key={index}
      day={cell}
      // hours={productivityData[dateKey] || 0 }
     hours={
(() => {
    // console.log(
    //     "DATE:",
    //     dateKey,
    //     "VALUE:",
    //     productivityData[dateKey]
    // );
    console.log("PRODUCTIVITY DATA");
console.log(productivityData);

    return productivityData[dateKey] || 0;
})()
}
      
               
    />
  );
})}

    </div>
  );
}

