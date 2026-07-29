import WeeklyProductivityChart from "../components/statistics/WeeklyProductivityChart";
import { useEffect, useState } from "react";
import statisticsService from "../services/statisticsService";

export default function Analytics() {
   
    const [weeklyData, setWeeklyData] = useState([]);

    useEffect(() => {

    loadWeeklyData();

}, []);
    
const loadWeeklyData = async () => {

    try {

        const data =
            await statisticsService.getWeeklyProductivity();

        setWeeklyData(data);

    } catch (error) {

        console.error(error);

    }

};
    return (

        <div className="flex flex-col gap-4">

        <WeeklyProductivityChart
           weeklyData={weeklyData}
         />

    </div>

    );

}