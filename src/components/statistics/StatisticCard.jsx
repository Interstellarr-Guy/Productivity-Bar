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

    bg-transparent
    shadow-none
    rounded-none
    border-none

    lg:bg-white/5
    lg:backdrop-blur-xl
    lg:rounded-lg
    lg:shadow-md
    ${color}

    hover:-translate-y-1
    transition-all duration-300
    hover:shadow-lg

    flex flex-col
    justify-center items-center

    px-2 py-2
    lg:px-3 lg:py-2
      `}
    >
      {/* Mobile */}
      <div className="flex flex-col items-center lg:hidden">
        <span
          className="uppercase text-[10px] font-medium text-gray-300 leading-none"
        >
          {title}
        </span>

        <span className="text-sm font-bold text-white mt-1">
          {value}
        </span>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>

          <span className="uppercase tracking-wide text-xs font-medium">
            {title}
          </span>
        </div>

        <span className="text-lg font-bold text-white mt-1">
          {value}
        </span>
      </div>
    </div>
  );
}