import Days from "../components/Days";

export default function Navbar({
  month,setMonth,
}) {
 
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

  return (

    <div className="navbar h-full ">

    <div className="flex">
         <div className="logoNav">
         <img className="logo" src="/images/logopro1.png" alt="" />
         </div>

         <div>
         <h2 className=" titleName drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] rounded ml-4 pr-2 pl-2 ">Productivity Tracker</h2>
         </div> 
   </div>
    <div className="relative bottom-5">
        <select
    value={month}
    onChange={(e) => setMonth(Number(e.target.value))}
    className="
    months
        bg-[#1e2229]
        rounded
        px-3
        py-2
        text-white
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