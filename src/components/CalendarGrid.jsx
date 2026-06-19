import {
  generateMonthDates,
  getFirstDay,
} from "../Utils/CalendarUtils";
import DayCell from "./DayCell";

export default function CalendarGrid({ year, month }) {

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

const productivityData = {
    "2026-01-01" : 6,
    "2026-01-02" : 9,
    "2026-01-03" : 3,
    "2026-01-04" : 8,
    "2026-01-05" : 3,
}



  return (
    <div className="grid grid-cols-7 h-full bg-[#777]">

      {fullCalendar.map((cell, index) => {

        const dateKey =
  `2026-01-${String(cell).padStart(2, "0")}`;
  return cell === null ? (
    <div
      key={index}
      className="border border-gray-400 bg-[#444]"
    />
  ) : (
    <DayCell
      key={index}
      day={cell}
      hours={productivityData[dateKey] || 1}
    />
  );
})}

    </div>
  );
}

/* <div
          key={index}
          className={`border border-gray-400 relative min-h-32
          ${cell === null ? "bg-[#444]" : "bg-[#666]"}
          `}
        >
          {cell !== null && (
            <span className="absolute top-1 left-1">
              {cell}
            </span>
          )}
        </div> */