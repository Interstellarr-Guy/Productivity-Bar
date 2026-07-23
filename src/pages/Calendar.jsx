import CalendarGrid from "../components/CalendarGrid";
import { useState } from "react";
import Modal from "../components/ProductivityModal";
import MonthSelector from "../components/MonthSelector";
import AppLayout from "../layout/AppLayout";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/Navbar";
import Days from "../components/Days";


export default function Calendar({ tasks, setTasks, loadTasks,}) {
  
  const today = new Date();
  const [year] = useState(today.getFullYear());
  const [month, setMonth] =
    useState(today.getMonth());

 

  // const months =
  // ["January", "February", "March", "April", "May", "June",
  //  "July", "August", "September", "October", "November", "December"];

    // <MonthSelector
    //            months={months}
    //            currentMonth={month}
    //            setMonth={setMonth}
    //          />  

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
    navbar={<Navbar 
     month={month}
     setMonth={setMonth}/>}
  >

    <div className="h-full">

    
      
      <Days />

      <CalendarGrid
        year={year}
        month={month}
        productivityData={productivityData}
      />
    </div>

  </AppLayout>
);

}