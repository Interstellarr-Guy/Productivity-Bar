import { useState, useEffect } from "react";

export default function useProductivity() {
  const [productivityData, setProductivityData] = useState(() => {
    const saved = localStorage.getItem("productivityData");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(
      "productivityData",
      JSON.stringify(productivityData)
    );
  }, [productivityData]);

  const saveHours = (dateKey, hours) => {
    setProductivityData(prev => ({
      ...prev,
      [dateKey]: hours,
    }));
  };

  const deleteHours = (dateKey) => {
    setProductivityData(prev => {
      const updated = { ...prev };
      delete updated[dateKey];
      return updated;
    });
  };

  return {
    productivityData,
    saveHours,
    deleteHours,
  };
}