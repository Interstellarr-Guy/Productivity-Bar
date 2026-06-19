

export default function DayCell({ day, hours=0}) {

const fillPercentage = (hours /12) * 100;
    return(
      <div className="border border-gray-400 relative min-h-30 bg-[#666]">
      <span className="absolute top-1 left-1">
      {day}
      </span>

      <div className="absolute bottom-0 left-0 w-full h-full flex items-end"> 
        <div
          className="w-full bg-[#095900]"
          style={{
            height: `${fillPercentage}%`
          }}
        />
      </div >
    </div>

    );
}