export default function UserCard() {

    const userName =
        localStorage.getItem("userName") || "User";

    return (

        <div
            className="
                bg-white/5
                backdrop-blur-xl
                rounded-lg
                
                p-2
                lg:p-2.5
                border
                border-white/10
            "
        >

            <h5
                className="
                    text-center
                    font-semibold
                    text-base
                    lg:text-lg
                "
            >
                Habit Tracker
            </h5>

            <p
                className="
                    mt-2
                    text-center
                    text-sm
                    lg:text-base
                    text-gray-200
                "
            >
                🙂 Welcome {userName}
            </p>

        </div>

    );

}