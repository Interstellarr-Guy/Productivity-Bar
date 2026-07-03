export default function MonthSelector({
  months,
  currentMonth,
  setMonth,
}) {
  return (
    <div className="flex gap-2 p-2 bg-[#111]">
      {months.map((month, index) => (
        <button
          key={index}
          onClick={() => setMonth(index)}
          className={`
            border
            px-2
            rounded
            transition-colors

            ${
              currentMonth === index
                ? "bg-[#2f673d] text-white"
                : "bg-[#cc3b2b] hover:bg-[#2f673d]"
            }
          `}
        >
          {month}
        </button>
      ))}
    </div>
  );
}