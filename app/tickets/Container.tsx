'use client'
import React, { useEffect, useContext, Suspense } from 'react';
import useHttp from '@/hooks/useHttp';
import { requestFlightsApiObject, } from '@/util/index';
import { FROMLOCATION, TOLOCATION, DEPARTURE, RETURN } from '@/constants';
import FlightContext from '@/context/flightState';
import styles from './container.module.css';
import SearchAdvance from '@/components/AdvanceSearch/SearchAdvance';
import useURLParams from '@/hooks/useUrlParams';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/theme/theme';

const Container = () => {

    const { isLoading, sendRequest } = useHttp();

    const { getUrlParamsValue } = useURLParams()

    const flightContext = useContext(FlightContext);

    const contextFlightsLength = flightContext?.flightData || [];

    const getFlights = async () => {

        const fromLocation = getUrlParamsValue( FROMLOCATION)
        const toLocation = getUrlParamsValue(TOLOCATION)
        const departureDate = getUrlParamsValue(DEPARTURE)
        const returnDate = getUrlParamsValue(RETURN)

        const requconFig = requestFlightsApiObject(fromLocation, toLocation, departureDate, returnDate );
    
        await sendRequest({requestConfig: requconFig, callback: flightContext?.setData || (()=>{})})
    };

    const renderFlightsAvailable = () => (
        isLoading ? 
            <span>Getting data</span>
        :
            <span>
                <b>{contextFlightsLength.length}</b> Total flights avaliable
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
                        <SearchAdvance getFlights={getFlights}/>
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
                        main
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Container