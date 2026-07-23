

export default function Navbar() {

    const weekDays = [
    
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    
    ];

  return (
    <div className="grid grid-cols-7">

    {weekDays.map(day => (

        <div
            key={day}
            className="
                text-center
                font-semibold
                py-0
                border-b
                border-gray-700
            "
        >
            {day}

        </div>

    ))}

</div>     
  );
}