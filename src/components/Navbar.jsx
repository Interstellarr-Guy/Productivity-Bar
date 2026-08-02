

export default function Navbar({
  month,setMonth,
}) {
 
  const months = [
    "January","February","March","April","May","June","July","August","September","October","November","December"
];

  return (

    <div className="navbar h-full flex items-center justify-between 
                    px-4 sm:px-3 lg:px-4">

                      {/* Logo */}
    
    <div className=" h-full flex items-center justify-center flex-shrink-0">
         <img
         src="/images/logopro1.png"
         alt="Logo"
         className="
           h-[70%]
           sm:h-[75%]
           lg:h-[90%]
           w-auto
           rounded
           shrink-0
           object-contain
          "
/>
    </div>
                     {/* Title */}
    <div className="h-full flex 
                    ml-3 mr-auto
                    items-center justify-center 
                    px-2 sm:px-3 lg:px-4">
          <h4 className="text-[clamp(1rem,2vw,2rem)]
                        sm:text-2xl
                        lg:text-3xl
                        xl:text-4xl
                        font-bold
                        whitespace-nowrap
                        truncate
                        drop-shadow-[0_2px_2px_rgba(0,0,0,.5)]">Habit Tracker
          </h4>
    </div> 
                     {/* Month */}
    <div className="h-full flex items-center justify-center flex-shrink-0">
        <select
    value={month}
    onChange={(e) => setMonth(Number(e.target.value))}
    className="
    months
        w-20
    sm:w-24
    lg:w-28
    ml-2
    text-black

    text-xs
    sm:text-sm

    px-1
    sm:px-2

    rounded
    bg-white/10
    border border-white/10  
    "
>
      {months.map((m, index) => (

        <option
            key={index}
            value={index}
        >

            {m}

        </option>

    ))}

</select>
    </div>
     
     
    </div>
    
    
  );
}