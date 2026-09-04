import { Link } from "react-router-dom";
import { isLoggedIn } from "../../Utils/storageMode";

export default function UserCard() {

    const loggedIn = isLoggedIn();
    const userName = localStorage.getItem("userName");
 

    return (

    <div
        className="
            bg-white/5
            backdrop-blur-xl
            rounded-lg
            pl-2 pr-2
            text-[#999]
          
        "
    >

        {loggedIn ? (

            <>
                <h5 className="text-center font-semibold text-lg">
                    Productivity Tracker
                </h5>

                <p className="mt-2 text-center text-sm">
                     Welcome {userName}
                </p>
            </>

        ) : (

            <>  
            <div className="pb-0.5
            rounded">
                <h5 className="text-center text-[#793616] font-semibold text-lg">
                    Productivity Tracker
                </h5>

                <p className=" text-center text-sm text-gray-300">
                    Sign in to sync
                </p>

                <div className=" flex gap-2">

                    <Link
                        to="/login"
                        className="
                            flex-1
                            border
                            bg-blue-600
                            border-white/20
                            hover:bg-white/10
                            text-white
                            text-center
                            rounded-md
                            font-medium
                            
                        "
                    >
                        Login
                    </Link>

                    <Link
                        to="/login?mode=register"
                        className="
                            flex-1
                            
                           
                             bg-red-600
                            hover:bg-red-700
                            text-center
                            text-black
                            
                            rounded-md
                            font-medium
                        "
                    >
                        Register
                    </Link>

                </div>
                </div>
            </>

        )}

    </div>

);

}