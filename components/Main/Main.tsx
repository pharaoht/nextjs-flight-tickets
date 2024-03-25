import { useContext } from 'react';
import styles from './main.module.css';
import FlightContext from '@/context/flightState';
import { CircularProgress, IconButton } from '@mui/material';

interface PropsForMain {
    isLoading: boolean;
}

const Main = ({ isLoading }: PropsForMain) => {

    const flightContext = useContext(FlightContext);

    const flightData = flightContext?.flightData || [];

    const noFlightsPrompt = () => (
        <div>No flights available</div>
    );

    const loadingPrompt = () => (
        <IconButton aria-label="delete">
            <CircularProgress size={20} />
        </IconButton>
    );

    const renderFlights = () => (

        flightData.map((itm,idx) => (
            <div>{itm.cityFromCode} - {itm.cityToCode}</div>
        ))
    );

    return(
        <div className={styles.container}>
            { isLoading && loadingPrompt() }
            { !isLoading && flightData.length === 0 && noFlightsPrompt() }
            { !isLoading && flightData.length > 0 && renderFlights() }
        </div>
    )
}

export default Main;