import { Link } from "react-router-dom";
import { isLoggedIn } from "../../Utils/storageMode";

export default function UserCard() {

    //     const userName =
    //     localStorage.getItem("userName") || "User";

    const loggedIn = isLoggedIn();
    const userName = localStorage.getItem("userName");

   // const isLoggedIn = !!token;    

    return (

    <div
        className="
            bg-white/5
            backdrop-blur-xl
            rounded-lg
            p-3
            border
            border-white/10
        "
    >

        {loggedIn ? (

            <>
                <h5 className="text-center font-semibold text-lg">
                    Productivity Tracker
                </h5>

                <p className="mt-2 text-center text-sm">
                    🙂 Welcome {userName}
                </p>
            </>

        ) : (

            <>
                <h5 className="text-center font-semibold text-lg">
                    Productivity Tracker
                </h5>

                <p className="mt-2 text-center text-sm text-gray-300">
                    Sign in to sync your productivity across devices.
                </p>

                <div className="mt-4 flex gap-2">

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
                            py-2
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
                            py-2
                            rounded-md
                            font-medium
                        "
                    >
                        Register
                    </Link>

                </div>
            </>

        )}

    </div>

);

}