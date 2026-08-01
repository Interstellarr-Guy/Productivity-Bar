import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function NavigationMenu({

    page,

    setPage,

}) {

const [showSettings, setShowSettings] = useState(false);

const navigate = useNavigate();

const userName = localStorage.getItem("userName");

const handleLogout = () => {

    authService.logout();

    navigate("/login");

};

    return (

        <div className="w-full p-3 mt-0 bg-[#a54c35]/20 backdrop-blur-xl 
        rounded space-y-1.5 lg:space-y-2">

            <button
                className="block w-full  mb-2 
                rounded
               bg-white/20
               hover:bg-[#287e48]
                 transition-colors
                 font-medium
                 text-sm"
                onClick={() => setPage("calendar")}
            >
                📅 Calendar
            </button>

            <button
                className="block w-full mb-2
                           rounded
                           bg-white/20
                           hover:bg-[#287e48]
                           transition-colors
                           font-medium
                           text-sm "
                onClick={() => setPage("analytics")}
            >
                📊 Analytics
            </button>

            <button
              className="block w-full rounded
               bg-white/20
               hover:bg-[#287e48]
               transition-colors
               font-medium
               text-sm"
            onClick={() => setShowSettings(!showSettings)}
>
    ⚙ Settings
</button>

             {showSettings && (

    <div className="mt-2 rounded bg-black/20 p-3 text-center">

        <p className="text-xs text-gray-300">
            Logged in as
        </p>

        <p className="font-semibold text-sm mb-3">
            {userName}
        </p>

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

)}

        </div>

    );

}