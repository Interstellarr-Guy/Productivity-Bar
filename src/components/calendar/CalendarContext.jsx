import { useState } from "react";
import Days from "../Days";
import CalendarGrid from "../CalendarGrid";

export default function CalendarContent({ 
    productivityData,
    year,
    month,
 }) {

   

    return (

        <div className="flex flex-col h-full ">
          <Days />

        <div className="flex-1 overflow-hidden">
            <CalendarGrid
                year={year}
                month={month}
                productivityData={productivityData}
            />
        </div>  
        </div>

    );

}