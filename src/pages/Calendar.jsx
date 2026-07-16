import CalendarGrid from "../components/CalendarGrid";
import { useState } from "react";
import Modal from "../components/ProductivityModal";
import MonthSelector from "../components/MonthSelector";

import AppLayout from "../layout/AppLayout";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/Navbar";


export default function Calendar({ tasks, setTasks, loadTasks,}) {
  const [year] = useState(2026);
  const [month, setMonth] = useState(0); 

  //Storing data for test in React state
  //const [selectedDate, setSelectedDate] = useState(null);
  // const [productivityData, setProductivityData] = useState({});
  // const [hoursInput, setHoursInput] = useState("");

//   const {
//     productivityData,
//     saveHours,
//     deleteHours,
// } = useProductivity();

  const months =
  ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"];

    //Handle Function for Save Button

//   const handleSave = () => {
//   if (isNaN(hours) || hours < 0 || hours > 12) {
//     alert("Hours must be between 0 and 12.");
//     return;
//   }

//   saveHours(selectedDate, hours);

//   setHoursInput("");
//   setSelectedDate(null);
// };

    //Handle Function for Delete Button

//   const handleDelete = () => {
//   deleteHours(selectedDate);

//   setHoursInput("");
//   setSelectedDate(null);
// };

  //  const formattedDate = selectedDate
  // ? new Date(selectedDate).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   })
  // : "";

  //New prod data
    const productivityData = {};

    tasks.forEach(task => {

    if (
        task.status === "DONE" &&
        task.completedDate &&
        task.workedMinutes > 0
    ) {

        productivityData[task.completedDate] =
            (productivityData[task.completedDate] || 0)
            + task.workedMinutes / 60;
    }

}); 

  return (
  <AppLayout
    sidebar={<Sidebar tasks={tasks} setTasks={setTasks} loadTasks={loadTasks}  productivityData={productivityData}/>}
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
      />
    </div>

  </AppLayout>
);

}