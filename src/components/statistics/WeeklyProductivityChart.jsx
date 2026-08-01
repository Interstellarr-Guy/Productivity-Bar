import {useState,useEffect } from "react";
import {
    BarChart,Bar,
    XAxis,YAxis,
    Tooltip,ResponsiveContainer, CartesianGrid} from "recharts";

export default function WeeklyProductivityChart({ weeklyData}) {
    
   // console.log(weeklyData);

   //Resize bar size 
   const [barSize, setBarSize] = useState(60);

useEffect(() => {
  const handleResize = () => {
  const w = window.innerWidth;

  if (w < 800) {
    setBarSize(28);
  } else if (w < 1200) {
    setBarSize(42);
  } else {
    setBarSize(65);
  }
};

  handleResize();
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

    return (

        <div className="bg-[#1f2937] rounded-xl p-4 mt-2 shadow-lg border
        border-gray-700">

            <h4 className="text-base
                           sm:text-sm 
                           lg:text-xl 
                           font-semibold mb-4">
                📊 Weekly Productivity
            </h4>

            <ResponsiveContainer width="100%" height={320}>

                <BarChart data={weeklyData}
                margin={{
                top: 10,
                right: 15,
                left: 5,
                bottom: 5,
    }}
    >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                    />
                    <XAxis dataKey="day"
                    tick={{ fill: "#ffffff" }} 
                    />

                    <YAxis 
                    tick={{ fill: "#ffffff" }}
                    />

                    <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
    }}
/>

                    <Bar
                        dataKey="minutes"
                        fill="#22c55e"
                        radius={[6, 6, 0, 0]}
                        barSize={barSize}
                    />

                    

                </BarChart>
  

            </ResponsiveContainer>

        </div>

    );

}