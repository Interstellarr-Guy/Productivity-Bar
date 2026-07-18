

export default function CircularTimer({

    seconds,
    totalSeconds,
    ringColor,
}) {

    const radius = 65;

    const stroke = 8;

    const normalizedRadius = radius - stroke / 2;

    const circumference =
        normalizedRadius * 2 * Math.PI;

    const progress =
        seconds / totalSeconds;

    const strokeDashoffset =
        circumference * (1 - progress);

    return (

        <svg
     width="110"
     height="110"
     viewBox="0 0 160 160"
     className="-rotate-90"
>

    {/* background circle */}

    <circle
    cx="80"
    cy="80"
    r={normalizedRadius}
    stroke="#374151"
    strokeWidth={stroke}
    fill="none"
/>

    {/* progress */}

    <circle
    cx="80"
    cy="80"
    r={normalizedRadius}
    stroke={ringColor}
    strokeWidth={stroke}
    fill="none"
    strokeLinecap="round"
    strokeDasharray={circumference}
    strokeDashoffset={strokeDashoffset}
    style={{
    transition: "stroke-dashoffset 1s linear, stroke 0.4s ease",
}}
/>

</svg>

    );

}