'use client'
import { FlightContextProvider } from "@/context/flightState"
import Container from "./Container"

const TicketWrapper = () => {
    return (
        <FlightContextProvider>
            <Container />
        </FlightContextProvider>
    )
};

export default TicketWrapper;