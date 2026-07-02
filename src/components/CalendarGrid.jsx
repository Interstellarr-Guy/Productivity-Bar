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
/*
const productivityData = {
    "2026-01-01" : 6,
    "2026-01-02" : 9,
    "2026-01-03" : 3,
    "2026-01-04" : 8,
    "2026-01-05" : 3,
    "2026-01-07" : 3,
    "2026-01-20" : 3,
}
*/
  return (
    <div className="grid grid-cols-7 h-full bg-[#777]  text-[#e7dee5]">

      {fullCalendar.map((cell, index) => {

    
    const dateKey =
`${year}-${String(month + 1).padStart(2, "0")}-${String(cell).padStart(2, "0")}`;

      return cell === null ? (
    <div
      key={index}
      className="border border-[#555] bg-[#333]"
    />
  ) : (
    <DayCell
      key={index}
      day={cell}
      hours={productivityData[dateKey] || 0 }
      onClick={()=> onDayClick(dateKey)}
               
    />
  );
})}

    </div>
  );
}

