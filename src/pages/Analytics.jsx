import WeeklyProductivityChart from "../components/statistics/WeeklyProductivityChart";
import { useEffect, useState } from "react";
import statisticsService from "../services/statisticsService";
import Heatmap from "../components/statistics/Heatmap";

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

    return (

        <div className="flex flex-col gap-4">

        <WeeklyProductivityChart
           weeklyData={weeklyData}
         />
         <Heatmap
         heatmapData={heatmapData}
         />

    </div>

    );

}