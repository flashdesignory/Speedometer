import { createContext, useContext, useState } from "react";
import data from "public/data/unsplash.json";

const DataContext = createContext(null);

export const DataContextProvider = ({ children }) => {
    const [currentData, setCurrentData] = useState({ ...data });
    const [currentCategory, setCurrentCategory] = useState("all");

    const updateData = (newValue) => {
        setCurrentData({
            ...data,
            ...newValue
        });
    };

    const updateCategory = (category) => {
        setCurrentCategory(category);
    };

    const value = {
        data: currentData,
        category: currentCategory,
        updateData,
        updateCategory,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
    const dataContext = useContext(DataContext);

    if (!dataContext)
        throw new Error("A DataProvider must be rendered before using useDataContext");

    return dataContext;
};
