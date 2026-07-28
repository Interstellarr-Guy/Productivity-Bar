export default function StatisticCard({

    title,
    value,
    icon,
    color,

}) {

    return (

        <div
            className={`
              
                 bg-white/5
                 backdrop-blur-xl

        rounded-lg
        border-0
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
            <div className="flex flex-row">

            
            <div
                className="text-xl mb-0"
            >
                {icon}
            </div>

            <p
                className="text-xl uppercase text-[#67a67d] mb-0 "
            >
                {title}
            </p>
            </div>
            
            <h4
                className={`text-xl font-bold text-white mb-0`}
            >
                {value}
            </h4>

        </div>

    );

}