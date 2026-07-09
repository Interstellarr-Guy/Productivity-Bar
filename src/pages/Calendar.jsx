import CalendarGrid from "../components/CalendarGrid";
import { useState } from "react";
import Modal from "../components/ProductivityModal";
import MonthSelector from "../components/MonthSelector";
import useProductivity from "../hooks/useProductivity";
import AppLayout from "../layout/AppLayout";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/Navbar";

export default function Calendar() {
  const [year] = useState(2026);
  const [month, setMonth] = useState(0); 

  //Storing data for test in React state
  const [selectedDate, setSelectedDate] = useState(null);
 // const [productivityData, setProductivityData] = useState({});
  const [hoursInput, setHoursInput] = useState("");

  const {
    productivityData,
    saveHours,
    deleteHours,
} = useProductivity();


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

  saveHours(selectedDate, hours);

  setHoursInput("");
  setSelectedDate(null);
};

    //Handle Function for Delete Button
  const handleDelete = () => {
  deleteHours(selectedDate);

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
  <AppLayout
    sidebar={<Sidebar />}
    navbar={<Navbar />}
  >

    <div className="h-full">

      <MonthSelector
        months={months}
        currentMonth={month}
        setMonth={setMonth}
      />

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
          formattedDate={formattedDate}
          hoursInput={hoursInput}
          setHoursInput={setHoursInput}
          handleSave={handleSave}
          handleDelete={handleDelete}
          setSelectedDate={setSelectedDate}
        />
      )}

    </div>

  </AppLayout>
);

}