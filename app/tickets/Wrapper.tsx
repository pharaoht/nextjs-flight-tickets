'use client'
import { FlightContextProvider } from "@/context/flightState"
import Container from "./Container"
import { Suspense } from "react";

const TicketWrapper = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FlightContextProvider>
                <Container />
            </FlightContextProvider>
        </Suspense>
    )
};

export default TicketWrapper;