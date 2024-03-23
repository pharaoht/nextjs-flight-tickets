import { Suspense } from "react";
import TicketWrapper from "./Wrapper";

const TicketDisplayPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TicketWrapper/>
        </Suspense>
    )
};

export default TicketDisplayPage;