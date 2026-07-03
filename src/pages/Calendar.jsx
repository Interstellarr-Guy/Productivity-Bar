import CalendarGrid from "../components/CalendarGrid";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";

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
      <Modal
      selectedDate={selectedDate}
      formatttedDate={formattedDate}
      hoursInput={hoursInput}
      setHoursInput={setHoursInput}
      handleSave={handleSave}
      handleDelete={handleDelete}
      setSelectedDate={setSelectedDate}
      />
)}
    </div>

    
    
  );
}