import CalendarGrid from "../components/CalendarGrid";
import { useState } from "react";

export default function Calendar() {
  const [year] = useState(2026);
  const [month, setMonth] = useState(0); 

  const months =
  ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"];

  return (
    <div className="h-screen">
      <div className="flex gap-2 p-2 bg-[#111]">
        {
          months.map((m, index) => (
            <button
              key={index}
              onClick={() => setMonth(index)}
              className="border px-2 bg-[#cc3b2b] rounded hover:bg-[#2f673d]"
          >
            {m}
          </button>
          ))
        }

      </div>

      <CalendarGrid
        year={year}
        month={month}
      />
    </div>
  );
}