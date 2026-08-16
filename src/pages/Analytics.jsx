import WeeklyProductivityChart from "../components/statistics/WeeklyProductivityChart";
import { useEffect, useState } from "react";
import statisticsService from "../services/statisticsService";
import Heatmap from "../components/statistics/Heatmap";
import HeatmapCard from "../components/statistics/HeatmapCard";
import { isLoggedIn, isGuest } from "../Utils/storageMode";
import guestTaskService from "../services/guestTaskService";

export default function Analytics() {
   
    const [weeklyData, setWeeklyData] = useState([]);
    const [heatmapData, setHeatmapData] = useState([]);

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
     
    //heat map
    useEffect(() => {
    loadHeatmap();
}, []);

    const loadHeatmap = async () => {

    try {

        const data =
            await statisticsService.getHeatmap();

        setHeatmapData(data);

    } catch (error) {

        console.error(error);
 
    }

};

 //16-08
 // login check
 const guestMode = !isLoggedIn();

    return (

        <div className="flex flex-col gap-4">
            <WeeklyProductivityChart
           weeklyData={weeklyData}
         />
{guestMode ? (

    <div className="text-center">
        🔒 Sign in to track your productivity
    </div>

) : (
        <div className="flex-1">

        </div>
 
)}
         <HeatmapCard>

        <Heatmap
        heatmapData={heatmapData}
        />

        </HeatmapCard>

    </div>

    );

}