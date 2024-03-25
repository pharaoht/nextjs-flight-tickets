'use client'
import React, { useEffect, useContext, Suspense } from 'react';
import useHttp from '@/hooks/useHttp';
import { getFlightParamBuilder, requestFlightsApiObject, } from '@/util/index';
import FlightContext from '@/context/flightState';
import styles from './container.module.css';
import Searchbar from '@/components/Searchbar/Searchbar';
import useURLParams from '@/hooks/useUrlParams';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/theme/theme';

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
            <span>Getting data</span>
        :
            <span>
                <b>{contextFlightsLength.length}</b> Total flights available
            </span>
    );

    useEffect(()=>{
        console.log('HIIIIIIIIIIII')
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
                        main
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Container