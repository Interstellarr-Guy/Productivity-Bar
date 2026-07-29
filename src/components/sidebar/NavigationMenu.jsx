export default function NavigationMenu({

    page,

    setPage,

}) {

    return (

        <div className="w-full p-3 mt-0 bg-[#a54c35]/20 backdrop-blur-xl rounded">

            <button
                className="block w-full text-left mb-2"
                onClick={() => setPage("calendar")}
            >
                📅 Calendar
            </button>

            <button
                className="block w-full text-left mb-2"
                onClick={() => setPage("analytics")}
            >
                📊 Analytics
            </button>

            <button
                className="block w-full text-left"
            >
                ⚙ Settings
            </button>

        </div>

    );

}