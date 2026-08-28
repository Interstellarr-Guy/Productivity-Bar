import UserCard from "../components/sidebar/UserCard";
import NewTaskButton from "../components/sidebar/NewTaskButton";
import TodayTasks from "../components/sidebar/TodayTasks";
import ProgressCard from "../components/sidebar/ProgressCard";
import PomodoroCard from "../components/sidebar/Pomodoro";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function MobileMenu({
    tasks,
    setTasks,
    loadTasks,
    productivityData,
}) {
    const userName = localStorage.getItem("userName");
    const navigate = useNavigate();
    const handleLogout = () => {

    authService.logout();

    navigate("/login");

};

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
            <UserCard/ >
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

            

        <button
            onClick={handleLogout}
            className="
                w-full
                rounded
                bg-red-600
                hover:bg-red-700
                transition-colors
                text-sm
                py-1
            "
        >
            🚪 Logout
        </button>   

    </div>



    );

}