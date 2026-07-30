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
        flex
        flex-col
        justify-center
        items-center
            `}
        >
            <div className="flex items-center justify-center gap-2 h-8">
               <span className="text-xl">
                    {icon}
               </span>

                <span className="text-lg uppercase font-medium">
                   {title}
                </span>
            </div>
            
            <h4
                className="text-xl font-bold text-white leading-none"
            >
                {value}
            </h4>

        </div>

    );

}