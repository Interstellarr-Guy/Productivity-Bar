import UserCard from "./UserCard";
import NewTaskButton from "./NewTaskButton";
import TodayTasks from "./TodayTasks";
import React from "react";
import ProgressCard from "./ProgressCard";
import PomodoroCard from "./Pomodoro";
import NavigationMenu from "./NavigationMenu";

export default function Sidebar({ tasks, setTasks, loadTasks, productivityData}) {
  return (
    <div className="h-full p-2.5 w-full bg-[#614d4d] flex flex-col">
    
        <UserCard />
        <NewTaskButton loadTasks={loadTasks}/>
    
    
    <div className="mt-0 flex-1 overflow-y-auto px-0 scrollbar-none">
        <TodayTasks tasks={tasks} setTasks={setTasks} loadTasks={loadTasks}  productivityData={productivityData}/>
    </div>
    
    <div className="mt-2">
       <ProgressCard tasks={tasks} />
       <PomodoroCard
    tasks={tasks}
    loadTasks={loadTasks}
/>
       
    </div>
       <NavigationMenu />
    
    </div>
  );
}