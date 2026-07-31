

export default function DayCell({ day, hours=0, onClick}) {

const fillPercentage = (hours /12) * 100;
    return(
      <div onClick={onClick} className="day relative bg-white/2 
                                        backdrop-blur-sm 
                                        border-1 border-[#777]    
                                        min-h-20
                                        lg:min-h-24
                                        xl:min-h-30

                                        cursor-pointer 
                                        rounded 
                                        overflow-hidden
                                        hover:border-green-500
                                        transition-all
                                        duration-300">
      <span className="absolute
                       top-2
                       left-2
                       text-[10px]
                       sm:text-xs
                       lg:text-sm
                       font-medium
                       text-[#b9b3ac]
                       select-none
                       ">
      {day}
      </span>

      <div className="absolute inset-0 left-0  flex items-end justify-center pb-1 "> 
        <div
          className="w-[55%] 
                      sm:w-[60%] lg:w-[70%]
                      bg-[#13b24b] rounded-t-md 
                      transition-all duration-800 ease-in-out 
                      drop-shadow-xl/50 shadow-lg"
          style={{
            height: `${fillPercentage}%`
          }}
        />
      </div>
    </div>
    );
}