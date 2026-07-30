export default function NavigationMenu({

    page,

    setPage,

}) {

    return (

        <div className="w-full p-3 mt-0 bg-[#a54c35]/20 backdrop-blur-xl rounded">

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
                className="block w-full  rounded
                           bg-white/20
                           hover:bg-[#287e48]
                           transition-colors
                           font-medium
                           text-sm"
            >
                ⚙ Settings
            </button>

        </div>

    );

}