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

  return (
    <div className="grid grid-cols-7 h-full">

      {cells.map((cell, index) => (
        <div
          key={index}
          className="border border-gray-400 relative min-h-30"
        >
          {cell && (
            <span className="absolute top-1 left-1">
              {cell}
            </span>
          )}
        </div>
      ))}

    </div>
  );
}