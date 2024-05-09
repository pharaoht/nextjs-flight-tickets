import { Suspense, useContext, useState } from 'react';
import styles from './main.module.css';
import FlightContext from '@/context/flightState';
import { CircularProgress, IconButton } from '@mui/material';
import Ticket from '../Ticket/Ticket';
import Dialog from '../Modal/Modal';
import Itinerary from '../Itinerary/Itinerary';

interface PropsForMain {
    isLoading: boolean;
    error: string;
    currency:string;
}

const Main = ({ isLoading, error, currency }: PropsForMain) => {

    const [isDialogOpen, setIsDialogOpen ] = useState<boolean>(false);

    const flightContext = useContext(FlightContext);

    const flightData = flightContext?.flightData || [];

    const filterData = flightContext?.filteredData || [];

    const dataSource = filterData.length > 0 ? filterData : flightData;

    const selectedFlight = flightContext?.selectedFlight || {};

    const setSelectedFlight = flightContext?.handleSelectFlights;

    const handleSelectFlight = (itm: {}) => {
        if(setSelectedFlight){
            setSelectedFlight(itm)
        }
    }

    const noFlightsPrompt = () => (
        <div>No flights available</div>
    );

    const errorPrompt = () => (
        <div>Error occured while getting flights</div>
    )

    const loadingPrompt = () => (
        <IconButton aria-label="delete">
            <CircularProgress size={20} />
        </IconButton>
    );

    const toggleIsOpen = () => setIsDialogOpen(prevState => !prevState);

    const renderFlights = () => (
        
        dataSource.map((itm,idx) => (
            
           <Ticket key={idx} 
                cityFrom={itm.airportFromCode}
                cityTo={itm.airportToCode}
                departDate={itm.localDeparture}
                arriveDate={itm.localArrival}
                returnDepartDate={itm.returnDepartLocal}
                returnArriveDate={itm.returnArrivalLocal}
                link={itm.link}
                stops={''}
                type={''}
                airlines={[]}
                countryFrom={itm.countryFromName}
                countryTo={itm.countryToName}
                durationDepart={itm.durationDeparture}
                durationReturn={itm.durationReturn}
                totalDuration={itm.totalDuration}
                price={itm.farePrice}
                departureFlights={itm.departureFlights}
                returnFlights={itm.returnFlights}
                departFlightDays={itm.flightDaysDepart}
                returnFlightDays={itm.flightDaysReturn}
                toggleDialog={toggleIsOpen}
                setSelectedFlights={handleSelectFlight}
                currency={currency}
                modalRouteDataSource={itm.modalRouteDataSource}
           />
        ))
    );
    
    return(
        <Suspense fallback={<>Loading</>}>
            <div className={styles.container}>
                { isLoading && !error && loadingPrompt() }
                { !isLoading && flightData.length === 0 && noFlightsPrompt() }

                { !isLoading && flightData.length > 0 && renderFlights() }
                { error && errorPrompt() }
                <Dialog isOpen={isDialogOpen} handleToggle={toggleIsOpen}>
                    <Itinerary flightData={selectedFlight} />
                </Dialog>
            </div>
        </Suspense>
    )
}

export default Main;