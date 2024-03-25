import { formatFlightData, } from "@/util";
import React, { useState, ReactNode,  } from "react";

interface FlightConextType {
    flightData: any[];
    setData?: (...args: any) => void;
}

const FlightContext = React.createContext<FlightConextType | null>(null);

interface FlightContextProviderProps {
    children: ReactNode
}

export const FlightContextProvider: React.FC<FlightContextProviderProps> = ({ children }) => {

    const [flightData, setFlightData] = useState<any[]>([]);

    const setData = ( flightData: any) => {
        const formattedData = formatFlightData(flightData)
        setFlightData(formattedData)
    };

    return <FlightContext.Provider value={{ 
        flightData, 
        setData,

        }}>
            { children}
        </FlightContext.Provider>
};


export default FlightContext;