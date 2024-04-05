import { useContext, useState } from 'react';
import styles from './main.module.css';
import FlightContext from '@/context/flightState';
import { CircularProgress, IconButton } from '@mui/material';
import Ticket from '../Ticket/Ticket';
import Dialog from '../Modal/Modal';
import Itinerary from '../Itinerary/Itinerary';

interface PropsForMain {
    isLoading: boolean;
}

const Main = ({ isLoading }: PropsForMain) => {

    const [isDialogOpen, setIsDialogOpen ] = useState<boolean>(false);

    const flightContext = useContext(FlightContext);

    const flightData = flightContext?.flightData || [];

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

    const loadingPrompt = () => (
        <IconButton aria-label="delete">
            <CircularProgress size={20} />
        </IconButton>
    );

    const toggleIsOpen = () => setIsDialogOpen(prevState => !prevState);

    const renderFlights = () => (
        
        flightData.map((itm,idx) => (
            
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
           />
        ))
    );
    
    return(
        <div className={styles.container}>
            { isLoading && loadingPrompt() }
            { !isLoading && flightData.length === 0 && noFlightsPrompt() }
            { !isLoading && flightData.length > 0 && renderFlights() }
            <Dialog isOpen={isDialogOpen} handleToggle={toggleIsOpen}>
                <Itinerary flightData={selectedFlight} />
            </Dialog>
        </div>
    )
}

export default Main;