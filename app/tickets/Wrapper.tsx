'use client'
import { FlightContextProvider } from "@/context/flightState"
import Container from "./Container"
import { Suspense } from "react";

const TicketWrapper = () => {
    return (
        <FlightContextProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <Container />
            </Suspense>
        </FlightContextProvider>
    )
};

export default TicketWrapper;