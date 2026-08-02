export default function StatisticsContainer({ children }) {

    return (

        <div
            className="
                stats 
                w-full

                bg-white/5
                backdrop-blur-xl
                border border-white/10
                rounded-xl

                px-2 py-2

                grid grid-cols-5
                gap-1

                lg:bg-transparent
                lg:backdrop-blur-none
                lg:border-0
                lg:rounded-none
                lg:px-0
                lg:py-0
                lg:gap-3">

            {children}

        </div>

    );

}