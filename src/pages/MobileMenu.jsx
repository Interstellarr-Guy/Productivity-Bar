import UserCard from "../components/sidebar/UserCard";
import NewTaskButton from "../components/sidebar/NewTaskButton";
import TodayTasks from "../components/sidebar/TodayTasks";
import ProgressCard from "../components/sidebar/ProgressCard";
import PomodoroCard from "../components/sidebar/Pomodoro";

export default function MobileMenu({
    tasks,
    setTasks,
    loadTasks,
    productivityData,
}) {

    return (

       

    <div
        className="
            h-full
            overflow-y-auto
            scrollbar-none
            p-3
            space-y-3
        "
    >
            <ProgressCard tasks={tasks} productivityData={productivityData} />

            <NewTaskButton loadTasks={loadTasks} />

            <TodayTasks
                tasks={tasks}
                setTasks={setTasks}
                loadTasks={loadTasks}
                productivityData={productivityData}
            />

            <ProgressCard tasks={tasks} productivityData={productivityData}/>

            <PomodoroCard
                tasks={tasks}
                loadTasks={loadTasks}
            />

    </div>



    );

}