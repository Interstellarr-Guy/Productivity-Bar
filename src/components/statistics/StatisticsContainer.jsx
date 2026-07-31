export default function StatisticsContainer({ children }) {

    return (

        <div
            className="
                stats w-full 
                
                grid grid-cols-5 
                gap-2 lg:gap-3
                
                min-h-20 lg:min-h-24 xl:m-h-28
                mb-0 ">

            {children}

        </div>

    );

}