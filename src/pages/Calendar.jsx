import CalendarGrid from "../components/CalendarGrid";
import { useState } from "react";

export default function Calendar() {
  const [year] = useState(2026);
  const [month, setMonth] = useState(0); 

  //Storing data for test in React state
  const [selectedDate, setSelectedDate] = useState(null);
  const [productivityData, setProductivityData] = useState({});
  const [hoursInput, setHoursInput] = useState("");

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
        productivityData={productivityData}
        onDayClick={setSelectedDate}
      />
      // First Data Model

      {selectedDate && (
  <div
    className="
      fixed inset-0
      bg-black/50
      flex items-center justify-center
    "
  >
    <div className="bg-white p-4 rounded">

      <h2>{selectedDate}</h2>
    
      <input
      type="number"
      min="0"
      max="12"
      value={hoursInput}
      onChange={(e) => setHoursInput(e.target.value)}
      onKeyDown={(e) => {
    if (e.key === "Enter") {
      setProductivityData(prev => ({
        ...prev,
        [selectedDate]: Number(hoursInput)
      }));

      setHoursInput("");
      setSelectedDate(null);
    }
  }}
  className="border p-2"
/>

      <button
      onClick={() => {

      setProductivityData(prev => ({
      ...prev,
      [selectedDate]: Number(hoursInput)
      }));

      setHoursInput("");
      setSelectedDate(null);

      }}
>
      Save
</button>
      
    </div>
  </div>
)}
    </div>

    // First Data Model
    
  );
}