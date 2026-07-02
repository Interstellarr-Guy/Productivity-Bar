import CalendarGrid from "../components/CalendarGrid";
import { useState, useEffect } from "react";

export default function Calendar() {
  const [year] = useState(2026);
  const [month, setMonth] = useState(0); 

  //Storing data for test in React state
  const [selectedDate, setSelectedDate] = useState(null);
 // const [productivityData, setProductivityData] = useState({});
  const [hoursInput, setHoursInput] = useState("");

  const [productivityData, setProductivityData] = useState(() => {
  const savedData = localStorage.getItem("productivityData");
        return savedData ? JSON.parse(savedData) : {};
});


  useEffect(() => {
     localStorage.setItem(
     "productivityData",
     JSON.stringify(productivityData)
  );
}, [productivityData]);

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
         onDayClick={(dateKey) => {
         setSelectedDate(dateKey);
         setHoursInput(productivityData[dateKey] || "");
  }}
      />
    
      {selectedDate && (
  <div
    className="
      fixed inset-0
      bg-black/50
      flex items-center justify-center
    "
  >
    <div className="bg-[#822715] p-4 rounded">

      <h2>{selectedDate}</h2>
    
      <input
      type="number"
      min="0"
      max="12"
      value={hoursInput}
      onChange={(e) => setHoursInput(e.target.value)}
      autoFocus
      onKeyDown={(e) => {
      if (e.key === "Enter") {

      const updatedData = {
      ...productivityData,
      [selectedDate]: Number(hoursInput),
      };

      setProductivityData(updatedData);

      localStorage.setItem(
      "productivityData",
      JSON.stringify(updatedData)
      );

    setHoursInput("");
    setSelectedDate(null);
  }
}}
  className="border p-2 bg-[#8a7676]"
/>

      <button
  onClick={() => {

    const updatedData = {
      ...productivityData,
      [selectedDate]: Number(hoursInput),
    };

    setProductivityData(updatedData);

    localStorage.setItem(
      "productivityData",
      JSON.stringify(updatedData)
    );

    setHoursInput("");
    setSelectedDate(null);

  }}
>
                        Save
     </button>

   <button
   onClick={() => {

    const updatedData = { ...productivityData };

    delete updatedData[selectedDate];

    setProductivityData(updatedData);

    setHoursInput("");
    setSelectedDate(null);

  }}
>
                        Delete
    </button>
      
    </div>
  </div>
)}
    </div>

    
    
  );
}