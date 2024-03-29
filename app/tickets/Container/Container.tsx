'use client'
import useHttp from '@/hooks/useHttp';
import { theme } from '@/theme/theme';
import Main from '@/components/Main/Main';
import styles from './container.module.css';
import { ThemeProvider } from '@emotion/react';
import useURLParams from '@/hooks/useUrlParams';
import FlightContext from '@/context/flightState';
import Searchbar from '@/components/Searchbar/Searchbar';
import IconButton from '@mui/material/IconButton/IconButton';
import React, { useEffect, useContext, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { getFlightParamBuilder, requestFlightsApiObject, } from '@/util/index';

const Container = () => {

    const { isLoading, sendRequest } = useHttp();

    const { getAllUrlParams } = useURLParams()

    const flightContext = useContext(FlightContext);

    const contextFlightsLength = flightContext?.flightData || [];

    const getFlights = async () => {

        const params = getAllUrlParams();

        const paramEndpoint = getFlightParamBuilder(params);

        const requconFig = requestFlightsApiObject(paramEndpoint);
    
        await sendRequest({requestConfig: requconFig, callback: flightContext?.setData || (()=>{})})
    };

    const renderFlightsAvailable = () => (
        isLoading ? 
            <span className={styles.loaderContainer}>
                <CircularProgress size={15} /> 
                <span className={styles.titleLoad}>Gathering Data</span>
            </span>
        :
            <span>
                <b>{contextFlightsLength.length}</b> Total flights available
            </span>
    );

    useEffect(()=>{
      getFlights()
    },[]);

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.parentTicketContainer}>
                <div className={styles.flighEditComponent}>
                    <Suspense fallback={<>Loading</>}>
                        <Searchbar getFlights={getFlights}/>
                    </Suspense>
                </div>
                <div className={styles.mainFlightInfo}>
                    <div className={styles.sidebarComponent}>
                        <div className={styles.sidebarTotal}>
                            { renderFlightsAvailable() }
                        </div>
                        side bar
                    </div>
                    <div className={styles.ticketArea}>
                        <Main isLoading={isLoading}/>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Container