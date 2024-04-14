import { formatFlightData, } from "@/util";
import React, { useState, ReactNode, Suspense,  } from "react";

interface FlightConextType {
    flightData: any[];
    setData?: (...args: any) => void;
    selectedFlight: {};
    handleSelectFlights?: (...args: any) => void;
    setSideBarChange?: (...args: any) => void;
    sideBarChange?: boolean;
}

const FlightContext = React.createContext<FlightConextType | null>(null);

interface FlightContextProviderProps {
    children: ReactNode
}

export const FlightContextProvider: React.FC<FlightContextProviderProps> = ({ children }) => {

    const [ flightData, setFlightData ] = useState<any[]>([]);

    const [ selectedFlight, setSelectedFlight ] = useState<{}>({});

    const [ sideBarChange, setSideBarChange ] = useState(false);
    
    const setData = ( flightData: any) => {
        const formattedData = formatFlightData(flightData)
        setFlightData(formattedData)
    };

    const handleSelectFlights = ( data: []) => {
        setSelectedFlight(data);
    }

    return (
        <Suspense fallback={<>loading</>}>
            <FlightContext.Provider 
                value={{ 
                    flightData, 
                    setData,
                    selectedFlight,
                    handleSelectFlights,
                    sideBarChange, 
                    setSideBarChange 
                }}
            >
                { children}
            </FlightContext.Provider>
        </Suspense>
    )
};


export default FlightContext;