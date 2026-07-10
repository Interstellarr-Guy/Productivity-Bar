import UserCard from "./UserCard";
import NewTaskButton from "./NewTaskButton";
import TodayTasks from "./TodayTasks";
import React from "react";
import ProgressCard from "./ProgressCard";
import PomodoroCard from "./PomodoroCard";
import NavigationMenu from "./NavigationMenu";

export default function Sidebar({ tasks, setTasks, addTask}) {
  return (
    <div className="h-full p-4 w-full bg-[#614d4d] flex flex-col">
    
        <UserCard />
        <NewTaskButton tasks={tasks} setTasks={setTasks} addTask={addTask}/>
    
    
    <div className="mt-4 flex-1 overflow-y-auto px-1 scrollbar-none">
        <TodayTasks tasks={tasks} setTasks={setTasks}/>
    </div>
    
    <div className="mt-4 ">
       <ProgressCard tasks={tasks} />
       <PomodoroCard/>
       
    </div>
       <NavigationMenu />
    
    </div>
  );
}