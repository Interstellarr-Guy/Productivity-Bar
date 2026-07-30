export default function HeatmapCard({ children }) {

    return (

        <div className="
            bg-slate-800/70
            border
            border-slate-700
            rounded-xl
            p-6
            shadow-lg
        ">

            <h2 className="text-3xl font-bold text-white mb-6">

                🔥 GitHub Activity

            </h2>

            {children}

        </div>

    );

}