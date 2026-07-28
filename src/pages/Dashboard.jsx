import { useEffect, useState } from "react";
import Calendar from "../pages/Calendar";
import taskService from "../services/taskService";
import statisticsService from "../services/statisticsService";
import StatisticsCard from "../components/statistics/StatisticsCard";
import StatisticsContainer from "../components/statistics/StatisticsContainer";
import StatisticCard from "../components/statistics/StatisticCard";

export default function Dashboard() {

    const [tasks, setTasks] = useState([]);

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
    //test
    console.log(statistics);
    return (
    <>  
    
        <Calendar
            tasks={tasks}
            setTasks={setTasks}
            loadTasks={loadTasks}
            statistics={statistics}
            
        />
        
        </> 
    );

}