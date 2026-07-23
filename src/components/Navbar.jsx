

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
    <div className="h-full flex text-[#a53518] items-center justify-around px-6">
    <div>
      <h2 className="text-[#c62801]">PRODUCTIVITY TRACKER</h2>
      </div> 

     <div>
        <select
    value={month}
    onChange={(e) => setMonth(Number(e.target.value))}
    className="
        bg-[#1f2937]
        border
        border-gray-700
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