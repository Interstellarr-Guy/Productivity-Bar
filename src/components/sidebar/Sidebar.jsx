import UserCard from "./UserCard";
import NewTaskButton from "./NewTaskButton";
import TodayTasks from "./TodayTasks";
import React from "react";
import ProgressCard from "./ProgressCard";
import PomodoroCard from "./Pomodoro";
import NavigationMenu from "./NavigationMenu";

export default function Sidebar({ tasks, setTasks, loadTasks, 
                                productivityData, page, setPage}) {
  return (
    <div className="sidebar h-full
                            w-full
                            flex
                            flex-col
                          bg-[#614d4d]
                            p-2
                            lg:p-2.5">
    
        <UserCard />
        <NewTaskButton loadTasks={loadTasks}/>
    
    
    <div className=" flex-1 overflow-y-auto overflow-x-hidden  scrollbar-none">
        <TodayTasks tasks={tasks} setTasks={setTasks} loadTasks={loadTasks}  productivityData={productivityData}/>
    </div>
    
    <div className="mt-2 space-y-2">
       <ProgressCard tasks={tasks} />
       <PomodoroCard
    tasks={tasks}
    loadTasks={loadTasks}
/>
       
    </div>
       <NavigationMenu
          page={page}
          setPage={setPage}
       />
    
    </div>
  );
}