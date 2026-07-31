import {
    BarChart,Bar,
    XAxis,YAxis,
    Tooltip,ResponsiveContainer, CartesianGrid} from "recharts";

export default function WeeklyProductivityChart({ weeklyData}) {
    
    console.log(weeklyData);

    return (

        <div className="bg-[#1f2937] rounded-xl p-4 mt-2 shadow-lg border
        border-gray-700">

            <h2 className="text-white text-lg font-semibold mb-4">
                📊 Weekly Productivity
            </h2>

            <ResponsiveContainer width="100%" height={300}>

                <BarChart data={weeklyData}
                margin={{
                top: 20,
                right: 200,
                left: 100,
                bottom: 10,
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
                        barSize={65}
                    />

                    

                </BarChart>
  

            </ResponsiveContainer>

        </div>

    );

}