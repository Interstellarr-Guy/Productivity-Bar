export default function StatisticCard({

    title,
    value,
    icon,
    color,

}) {

    return (

        <div
            className={`
                  stats-box
                 bg-white/5
                 backdrop-blur-xl
                 
        rounded-lg
        border-t-0
        mt-1 mb-1
        ${color}
        shadow-md
        hover:-translate-y-1

        transition-all
        duration-300
        hover:shadow-lg

        flex
        flex-col
        justify-center
        items-center
        px-2 py-1 
        lg:px-3 lg:py-2
            `}
        >
            <div className="flex items-center justify-center gap-2 h-8">
               <span className="text-sm
                                sm:text-lg
                                lg:text-lg
                                xl:text-xl">
                    {icon}
               </span>

                <span className="
                                uppercase font-medium
                                tracking-wide
                                leading-none"
                style={{
  fontSize: "clamp(0.7rem, 1vw, 0.8rem)"
}}>
                   {title}
                </span>
            </div>
            
            <span
                className="text-sm
                           sm:text-base lg:text-lg xl:text-xl            
                           font-bold text-white leading-tight"
            >
                {value}
            </span>

        </div>

    );

}