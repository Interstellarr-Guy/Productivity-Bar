import { useState, useEffect } from "react";
import productivityWorkspaceService from "../Services/ProductivityWorkspaceService";

export default function useProductivity() {
  const [productivityData, setProductivityData] = useState({});

  // useEffect(() => {
  //   localStorage.setItem(
  //     "productivityData",
  //     JSON.stringify(productivityData)
  //   );
  // }, [productivityData]);

  useEffect(() => {

    loadWorkspace();
}, []);

const loadWorkspace = async () => {

    
    
    try {

        const workspace =
            await productivityWorkspaceService.getWorkspace();

            console.log("Workspace from backend:", workspace);

        const data = workspace.productivityData
            ? JSON.parse(workspace.productivityData)
            : {};

        setProductivityData(data);

    } catch (error) {

        console.error("Failed to load workspace", error);

    }

};

  const saveHours = async (dateKey, hours) => {

    const updatedData = {
        
        ...productivityData,
        [dateKey]: hours,
    };

    setProductivityData(updatedData);

    try {

        await productivityWorkspaceService.updateWorkspace(
            JSON.stringify(updatedData)
        );

    } catch (error) {

        console.error("Failed to save workspace", error);

    }

};

  const deleteHours = async (dateKey) => {

    const updatedData = { ...productivityData };

    delete updatedData[dateKey];

    setProductivityData(updatedData);

    try {

        await productivityWorkspaceService.updateWorkspace(
            JSON.stringify(updatedData)
        );

    } catch (error) {

        console.error("Failed to delete hours", error);

    }

};

  return {
    productivityData,
    saveHours,
    deleteHours,
  };
}