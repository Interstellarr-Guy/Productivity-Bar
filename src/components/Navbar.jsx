

export default function Navbar({
  month,setMonth,
}) {
 
  const months = [
    "January","February","March","April","May","June","July","August","September","October","November","December"
];

  return (

    <div className="navbar h-full flex items-center justify-between px-4">

                      {/* Logo */}
    
    <div className=" h-full flex items-center justify-center">
         <img
         src="/images/logopro1.png"
         alt="Logo"
         className="
           h-[80%]
           w-auto
           rounded
           shrink-0
           object-contain
          "
/>
    </div>
                     {/* Title */}
    <div className="flex-1 flex items-center px-4">
         <h2 className="text-3xl
                        font-bold
                        drop-shadow-[0_2px_2px_rgba(0,0,0,.5)]">Productivity Tracker</h2>
    </div> 
                     {/* Month */}
    <div className="flex items-center">
        <select
    value={month}
    onChange={(e) => setMonth(Number(e.target.value))}
    className="
    months
        bg-white/5 backdrop-blur-xl
        text-black
        rounded
        px-3
        py-2
        
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