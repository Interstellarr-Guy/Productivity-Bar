

export default function DayCell({ day, hours=0, onClick}) {

const fillPercentage = (hours /12) * 100;
    return(
      <div onClick={onClick} className="border border-[#999] relative min-h-30 bg-[#160202]  cursor-pointer rounded ">
      <span className="absolute top-1 left-1 ">
      {day}
      </span>

      <div className="absolute inset-0 left-0  flex items-end justify-center"> 
        <div
          className="w-[70%] bg-[#13b24b] rounded-t-xl shadow-xl drop-shadow-xl/50 "
          style={{
            height: `${fillPercentage}%`
          }}
        />
      </div>
    </div>
    );
}