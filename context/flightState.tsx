import { formatFlightData, } from "@/util";
import React, { useState, ReactNode, Suspense,  } from "react";

interface FlightConextType {
    flightData: any[];
    setData?: (...args: any) => void;
    selectedFlight: {};
    handleSelectFlights?: (...args: any) => void;
    filterDuration?: (...args: any) => void;
    filteredData?: any[];
}

const FlightContext = React.createContext<FlightConextType | null>(null);

interface FlightContextProviderProps {
    children: ReactNode
}

export const FlightContextProvider: React.FC<FlightContextProviderProps> = ({ children }) => {

    const [ flightData, setFlightData ] = useState<any[]>([]);

    const [ filteredData, setFilteredData ] = useState<any[]>([]);

    const [ selectedFlight, setSelectedFlight ] = useState<{}>({});
    
    const setData = ( flightData: any) => {
        const formattedData = formatFlightData(flightData)
        setFlightData(formattedData)
    };

    const handleSelectFlights = ( data: []) => {
        setSelectedFlight(data);
    }

    const filterDuration = (hours: string) => {

        const hourArr = hours.split('-');

        const results = flightData.filter((itm, idx) => {
            if(Number(itm.totalDuration) > Number(hourArr[0]) 
                && Number(itm.totalDuration) < Number(hourArr[1])){
               return itm
            }

        });


        setFilteredData(results);

    }

    return (
        <Suspense fallback={<>loading</>}>
            <FlightContext.Provider 
                value={{ 
                    flightData, 
                    setData,
                    selectedFlight,
                    handleSelectFlights,
                    filteredData, 
                    filterDuration,
                }}
            >
                { children}
            </FlightContext.Provider>
        </Suspense>
    )
};


export default FlightContext;