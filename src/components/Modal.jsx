


export default function Modal({
    selectedDate,setSelectedDate, 
    hoursInput, setHoursInput, 
    handleSave, handleDelete, 
    formattedDate})
{
  return (
       <div
    className="
      fixed inset-0
      bg-black/50
      flex items-center justify-center
    "
  >
    <div className="bg-[#2d2d2d] w-90 rounded-xl p-6 shadow-2xl">
      <label className="text-gray-300 block mb-2 ">
         Productivity Hours
      </label>
    <h2 className="text-2xl font-bold text-white mb-4">
      {formattedDate}
    </h2>
    
      <input
        type="number"
        min="0"
        max="12"
        value={hoursInput}
        onChange={(e) => setHoursInput(e.target.value)}
        onKeyDown={(e) => {
           if (e.key === "Enter") {
           handleSave();
         }
  }}
        autoFocus
      className="
        w-full
        p-3
        rounded
       bg-[#444]  
       text-white border
       border-gray-500   
       focus:outline-none
       focus:border-green-500
       "
       
/>
    <div className="flex justify-center mt-5">
     <button
      onClick={handleSave}
      disabled={
        hoursInput === "" ||
        Number(hoursInput) < 0 ||
        Number(hoursInput) > 12}

    className={`px-4 py-2 rounded  text-white 
 ${
      hoursInput === "" ||
      Number(hoursInput) < 0 ||
      Number(hoursInput) > 12
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
  }` }
  >
       Save
     </button>

    <button onClick={handleDelete} className="bg-red-700 ml-3 px-2 py-2 rounded">
     Delete
    </button>

    <button
    onClick={()=>{
      setHoursInput("");
      setSelectedDate(null);
    }}
    className="bg-gray-600 px-4 py-2 rounded ml-3 text-white"
  >
    Cancel
  </button>  
      </div>

    </div>
  </div>
  );
}