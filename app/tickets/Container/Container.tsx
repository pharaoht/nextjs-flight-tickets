'use client'
import useHttp from '@/hooks/useHttp';
import { theme } from '@/theme/theme';
import Main from '@/components/Main/Main';
import styles from './container.module.css';
import { ThemeProvider } from '@emotion/react';
import useURLParams from '@/hooks/useUrlParams';
import FlightContext from '@/context/flightState';
import Sidebar from '@/components/Sidebar/Sidebar';
import Searchbar from '@/components/Searchbar/Searchbar';
import React, { useEffect, useContext, Suspense } from 'react';
import { CURRENCY, DEPARTARRIVEFROM, DEPARTARRIVETO, DEPARTOUTBOUNDTIMEFROM, DEPARTOUTBOUNDTIMETO, DEPARTURE, RETURN, TOTALDURATION } from '@/constants';
import { getFlightParamBuilder, requestFlightsApiObject, } from '@/util/index';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

// let dObTimeFrom

const Container = () => {

    const { isLoading, sendRequest, error } = useHttp();

    const { getAllUrlParams, getUrlParamsValue, setUrlParams } = useURLParams();

    const flightContext = useContext(FlightContext);
    const curr = getUrlParamsValue(CURRENCY) || 'USD';
    const dObTimeFrom = getUrlParamsValue(DEPARTOUTBOUNDTIMEFROM);
    const dObTimeTo = getUrlParamsValue(DEPARTOUTBOUNDTIMETO);
    const arrTimeFrom = getUrlParamsValue(DEPARTARRIVEFROM);
    const arrTimeTo = getUrlParamsValue(DEPARTARRIVETO);
    const departureDate = getUrlParamsValue(DEPARTURE);
    const returnDate = getUrlParamsValue(RETURN);
    const duration = getUrlParamsValue(TOTALDURATION);
    const dependencies = [ dObTimeFrom, dObTimeTo, returnDate, departureDate, arrTimeFrom, arrTimeTo, duration]

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

    useEffect(()=>{ getFlights() }, dependencies );

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.parentTicketContainer}>
                <div className={styles.flighEditComponent}>
                    <Suspense fallback={<>Loading</>}>
                        <Searchbar/>
                    </Suspense>
                </div>
                <div className={styles.mainFlightInfo}>
                    <div className={styles.sidebarComponent}>
                        <div className={styles.sidebarTotal}>
                            { !error && renderFlightsAvailable() }
                            { error && 'Error occured'}
                        </div>
                        <Sidebar/>
                    </div>
                    <div className={styles.ticketArea}>
                        <Suspense fallback={<>Loading</>}>
                            <Main isLoading={isLoading} error={error} currency={curr}/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Container