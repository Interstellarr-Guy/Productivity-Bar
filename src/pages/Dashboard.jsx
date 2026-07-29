import { useEffect, useState } from "react";

import taskService from "../services/taskService";
import statisticsService from "../services/statisticsService";
import StatisticsContainer from "../components/statistics/StatisticsContainer";
import StatisticCard from "../components/statistics/StatisticCard";
import Analytics from "./Analytics";
import AppLayout from "../layout/AppLayout";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/Navbar";
import CalendarContent from "../components/calendar/CalendarContext";


export default function Dashboard() {
     
    const [page, setPage] = useState("calendar");
    const [tasks, setTasks] = useState([]);

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
    
    const loadTasks = async () => {

        try {

            const workspaceId =
                localStorage.getItem("workspaceId");

            if (!workspaceId) return;

            const data =
                await taskService.getTasks(workspaceId);

            setTasks(data);

        } catch (error) {

            console.error("Failed to load tasks", error);

        }

    };

    useEffect(() => {

        loadTasks();

    }, []);

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

    loadStatistics();

}, []);
    
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

    return (

    <AppLayout

        sidebar={
            <Sidebar
                tasks={tasks}
                setTasks={setTasks}
                loadTasks={loadTasks}
                productivityData={productivityData}
                page={page}
                setPage={setPage}
            />
        }

        navbar={
            <Navbar />
        }

    >

        <div className="flex flex-col h-full">

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

            <div className="flex-1 overflow-hidden">

                {page === "calendar" && (

                    <CalendarContent
                        productivityData={productivityData}
                    />

                )}

                {page === "analytics" && (

                    <Analytics
                        statistics={statistics}
                    />

                )}

            </div>

        </div>

    </AppLayout>

);

}