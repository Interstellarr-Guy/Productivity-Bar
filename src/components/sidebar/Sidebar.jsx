import UserCard from "./UserCard";
import NewTaskButton from "./NewTaskButton";
import TodayTasks from "./TodayTasks";
import React from "react";

export default function Sidebar() {
  return (
    <div className="h-full p-4 w-[18%] md:w-[70px]">
    <UserCard />
    <NewTaskButton />
    <TodayTasks />
    </div>
  );
}