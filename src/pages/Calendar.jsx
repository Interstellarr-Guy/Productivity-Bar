import CalendarGrid from "../components/CalendarGrid";
import { useState } from "react";
import Modal from "../components/ProductivityModal";
import MonthSelector from "../components/MonthSelector";
import AppLayout from "../layout/AppLayout";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/Navbar";
import Days from "../components/Days";
import StatisticsContainer from "../components/statistics/StatisticsContainer";
import StatisticCard from "../components/statistics/StatisticCard";

export default function Calendar({ tasks, setTasks, 
                                   loadTasks, statistics,
                                   page, setPage }) {
  
  const today = new Date();
  const [year] = useState(today.getFullYear());
  const [month, setMonth] =
    useState(today.getMonth());

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
       //Helper for format Minutes
       const formatMinutes = (minutes) => {

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0 && mins > 0) {
        return `${hours}h ${mins}m`;
    }

    if (hours > 0) {
        return `${hours}h`;
    }

    return `${mins}m`;
};

  return (
  <AppLayout
    sidebar={<Sidebar tasks={tasks} setTasks={setTasks} 
     loadTasks={loadTasks}  productivityData={productivityData} 
     page={page} setPage={setPage}/>}

     navbar={<Navbar 
     month={month}
     setMonth={setMonth} />}
  >
    
    <div className="flex flex-col h-full ">
      
    <StatisticsContainer>

    <StatisticCard
        title="Today"
        value={formatMinutes(statistics.todayMinutes)}
        icon="📅"
        color="border-t-green-500"
    />

    <StatisticCard
        title="This Week"
        value={formatMinutes(statistics.weekMinutes)}
        icon="📈"
        color="border-t-blue-500"
    />

    <StatisticCard
        title="This Month"
        value={formatMinutes(statistics.monthMinutes)}
        icon="🗓️"
        color="border-t-yellow-500"
    />

    <StatisticCard
        title="Tasks"
        value={statistics.completedTasks}
        icon="✅"
        color="border-t-purple-500"
    />

    <StatisticCard
        title="Streak"
        value={`${statistics.currentStreak} Days`}
        icon="🏆"
        color="border-t-orange-500"
    />

    </StatisticsContainer>
        
      <div className="flex-1 flex flex-col overflow-hidden  scrollbar-none mt-0">

      
      <Days />

      <CalendarGrid
        year={year}
        month={month}
        productivityData={productivityData}
      />
      </div>
      
    </div>

  </AppLayout>
);

}