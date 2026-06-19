import {
  generateMonthDates,
  getFirstDay
} from "../Utils/CalendarUtils";

export default function Calendar() {

  console.log(generateMonthDates(2026, 0));
  console.log(getFirstDay(2026, 0));

  return (
    <div>Calendar</div>
  );
}