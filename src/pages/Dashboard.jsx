import { useEffect, useState } from "react";

import taskService from "../services/taskService";
import statisticsService from "../services/statisticsService";
import StatisticsContainer from "../components/statistics/StatisticsContainer";
import StatisticCard from "../components/statistics/StatisticCard";
import Analytics from "./Analytics";
import MonthSelector from "../components/MonthSelector";
import AppLayout from "../layout/AppLayout";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/Navbar";
import CalendarContent from "../components/calendar/CalendarContext";
import taskCompletionService from "../services/taskCompletionService";
import MobileDrawer from "../components/mobile/MobileDrawer";
import MobileMenu from "./MobileMenu";
import PomodoroCard from "../components/sidebar/Pomodoro";
import { isLoggedIn } from "../Utils/auth";

export default function Dashboard() {
     
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [page, setPage] = useState("calendar");
    const [tasks, setTasks] = useState([]);
    // For month 
    const today = new Date();
    const [year] = useState(today.getFullYear());
    const [month, setMonth] =
    useState(today.getMonth());
    

    //New prod data
//    const productivityData = {};

//     tasks.forEach(task => {

//     if (
//         task.status === "DONE" &&
//         task.completedDate &&
//         task.workedMinutes > 0
//     ) {

//         productivityData[task.completedDate] =
//             (productivityData[task.completedDate] || 0)
//             + task.workedMinutes / 60;
//     }

// });

const [productivityData, setProductivityData] = useState({});

// login check
const guestMode = !isLoggedIn();
   //Loader
   const loadProductivityData = async () => {

    try {

        const completions =
            await taskCompletionService.getAllCompletions();

        const data = {};

        completions.forEach(c => {

            data[c.completedDate] =
                (data[c.completedDate] || 0)
                + c.workedMinutes / 60;

        });

        setProductivityData(data);

    } catch (error) {

        console.error(error);

    }

};

   tasks.forEach(task => {

    console.log(task.title,
                task.status,
                task.completedDate,
                task.workedMinutes);

    if (
        task.completedDate &&
        task.workedMinutes > 0
    ) {

        productivityData[task.completedDate] =
            (productivityData[task.completedDate] || 0)
            + task.workedMinutes / 60;
    }

});
    
    const loadTasks = async () => {

        try {

            const workspaceId =
                localStorage.getItem("workspaceId");

            if (!workspaceId) return;

            const data =
                await taskService.getTasks(workspaceId);

            setTasks(data);
            await loadProductivityData();

        } catch (error) {

            console.error("Failed to load tasks", error);

        }

    };

    // guest Mode added
  useEffect(() => {

    if (!guestMode) {

        loadTasks();

    }

}, [guestMode]);

    //debug 
    console.log("Dashboard tasks:", tasks);
console.log("Is Array?", Array.isArray(tasks));
    
    //Statistics 
    const [statistics, setStatistics] = useState({

      todayMinutes: 0,

      weekMinutes: 0,

      monthMinutes: 0,

      completedTasks: 0,

      currentStreak: 0,

});

    useEffect(() => {

    if (!guestMode) {

        loadStatistics();

    }

}, [guestMode]);
    
    const loadStatistics = async () => {

    try {

        const data =
            await statisticsService.getStatistics();

        setStatistics(data);

    }

    catch (error) {

        console.error(error);

    }
    
};  

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
    //test
    console.log(statistics);

    //Auto collapse Handle
    useEffect(() => {

    const handleResize = () => {

        if (window.innerWidth < 800) {
            setSidebarCollapsed(true);
        } else {
            setSidebarCollapsed(false);
        }

    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

}, []);

    return (
  <>
    <AppLayout
        sidebarCollapsed={sidebarCollapsed}
    page={page}
    setPage={setPage}
    setSidebarCollapsed={setSidebarCollapsed}
    mobileMenuOpen={mobileMenuOpen}
    setMobileMenuOpen={setMobileMenuOpen}

    sidebar={
        <Sidebar
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}

            tasks={tasks}
            setTasks={setTasks}
            loadTasks={loadTasks}
            productivityData={productivityData}

            page={page}
            setPage={setPage}
        />
    }

    navbar={
        <Navbar
            month={month}
            setMonth={setMonth}
        />
    }

    >

        <div className="flex flex-col h-full">
          <div className="flex-shrink-0">
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
          </div>

            <div className="flex-1 overflow-hidden">

                {page === "calendar" && (

                    <CalendarContent
                        year={year}
                        month={month}
                        productivityData={productivityData}

                    />

                )}

                {page === "analytics" && (

                    <Analytics
                        statistics={statistics}
                    />

                )}

                {page === "menu" && (

                <MobileMenu
                    tasks={tasks}
                    setTasks={setTasks}
                    loadTasks={loadTasks}
                    productivityData={productivityData}
    />

)}                
              {page === "focus" && (
    
                <PomodoroCard
                    tasks={tasks}
                    loadTasks={loadTasks}
                />
              )}

            </div>

        </div>

    </AppLayout>

    
    <MobileDrawer
    open={mobileMenuOpen}
    onClose={() => setMobileMenuOpen(false)}
>
    <Sidebar
        sidebarCollapsed={false}
        setSidebarCollapsed={() => {}}

        tasks={tasks}
        setTasks={setTasks}
        loadTasks={loadTasks}
        productivityData={productivityData}

        page={page}
        setPage={setPage}

        guestMode={guestMode}
    />
    </MobileDrawer>
</>
);

}