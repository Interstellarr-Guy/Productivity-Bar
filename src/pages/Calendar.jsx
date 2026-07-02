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

    //Handle Function for Save Button
  const handleSave = () => {
  const hours = Number(hoursInput);

  if (isNaN(hours) || hours < 0 || hours > 12) {
    alert("Hours must be between 0 and 12.");
    return;
  }

  setProductivityData({
    ...productivityData,
    [selectedDate]: hours,
  });

  setHoursInput("");
  setSelectedDate(null);
};
    //Handle Function for Delete Button
  const handleDelete = () => {
  const updatedData = { ...productivityData };

  delete updatedData[selectedDate];

  setProductivityData(updatedData);

  setHoursInput("");
  setSelectedDate(null);
};

   const formattedDate = selectedDate
  ? new Date(selectedDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  : "";

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
    <div className="bg-[#2d2d2d] w-90 rounded-xl p-6 shadow-2xl">
      <label className="text-gray-300 block mb-2 ">
         Productivity Hours
      </label>
    <h2 className="text-2xl font-bold text-white mb-4">
      {formattedDate}
    </h2>
    
      <input
        type="number"
        min="0"
        max="12"
        value={hoursInput}
        onChange={(e) => setHoursInput(e.target.value)}
        onKeyDown={(e) => {
           if (e.key === "Enter") {
           handleSave();
         }
  }}
        autoFocus
      className="
        w-full
        p-3
        rounded
       bg-[#444]  
       text-white border
       border-gray-500   
       focus:outline-none
       focus:border-green-500
       "
       
/>
    <div className="flex justify-center mt-5">
     <button
      onClick={handleSave}
      disabled={
        hoursInput === "" ||
        Number(hoursInput) < 0 ||
        Number(hoursInput) > 12}

    className={`px-4 py-2 rounded  text-white 
 ${
      hoursInput === "" ||
      Number(hoursInput) < 0 ||
      Number(hoursInput) > 12
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
  }
`}
     >
       Save
     </button>

    <button onClick={handleDelete} className="bg-red-700 ml-3 px-2 py-2 rounded">
     Delete
    </button>

    <button
    onClick={()=>{
      setHoursInput("");
      setSelectedDate(null);
    }}
    className="bg-gray-600 px-4 py-2 rounded ml-3 text-white"
  >
    Cancel
  </button>  
      </div>

    </div>
  </div>
)}
    </div>

    
    
  );
}