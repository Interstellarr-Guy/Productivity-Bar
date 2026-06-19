import CalendarGrid from "../components/CalendarGrid";

export default function Calendar() {
  const year = 2026;
  const month = 0; // January

  return (
    <div className="h-screen">
      <CalendarGrid
        year={year}
        month={month}
      />
    </div>
  );
}