import UserCard from "./UserCard";
import NewTaskButton from "./NewTaskButton";
import TodayTasks from "./TodayTasks";
import React from "react";
import ProgressCard from "./ProgressCard";
import PomodoroCard from "./Pomodoro";
import NavigationMenu from "./NavigationMenu";

export default function Sidebar({ tasks, setTasks, loadTasks, 
                                productivityData, page, setPage,
                                sidebarCollapsed, setSidebarCollapsed,
                                guestMode,}) {
  return (
    <div className="sidebar h-full
                            w-full
                            flex
                            flex-col
                          bg-transparent
                         md:bg-[#111827]/90

                          backdrop-blur-none
                          md:backdrop-blur-2xl

                            p-2
                            lg:p-2.5
                            xl:p-3"
                            
                            >
    <div className="flex justify-end p-2">
        <div className="hidden md:flex">
    {/* Collapse button */}
               <button
               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
               className="p-2 rounded hover:bg-white/10"
    >
                   ☰
               </button>
        </div>
    
</div>
    {!sidebarCollapsed && (
      <>
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
      </>
    )}  


    </div>
  );
}