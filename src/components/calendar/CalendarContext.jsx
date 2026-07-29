import { useState } from "react";
import Days from "../Days";
import CalendarGrid from "../CalendarGrid";

export default function CalendarContent({ productivityData }) {

    const today = new Date();

    const [year] = useState(today.getFullYear());

    const [month] = useState(today.getMonth());

    return (

        <>
          <Days />
            <CalendarGrid
                year={year}
                month={month}
                productivityData={productivityData}
            />

        </>

    );

}