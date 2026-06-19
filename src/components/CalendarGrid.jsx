import {
  generateMonthDates,
  getFirstDay,
} from "../Utils/CalendarUtils";

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
  return (
    <div className="grid grid-cols-7 h-full bg-[#777]">

      {fullCalendar.map((cell, index) => (
        <div
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
        </div>
      ))}

    </div>
  );
}