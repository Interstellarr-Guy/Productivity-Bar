

export default function DayCell({ day, hours=0, onClick}) {

const fillPercentage = (hours /12) * 100;
    return(
      <div onClick={onClick} className="border border-gray-400 relative min-h-30 bg-[#666] cursor-pointer">
      <span className="absolute top-1 left-1">
      {day}
      </span>

      <div className="absolute bottom-0 left-0 w-full h-full flex items-end"> 
        <div
          className="w-full bg-[#1d421d] rounded-t-xl shadow-xl drop-shadow-xl/50"
          style={{
            height: `${fillPercentage}%`
          }}
        />
      </div>
    </div>
    );
}