'use client'
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import useHttp from '@/hooks/useHttp';
import { requestFlightsApiObject, getSearchParamValue } from '@/util/index';
import { FROMLOCATION, TOLOCATION, DEPARTURE, RETURN } from '@/constants';
import FlightContext from '@/context/flightState';
import styles from './container.module.css';

const Container = () => {

    const searchParams = useSearchParams();

    const { isLoading, sendRequest } = useHttp();

    const flightContext = useContext(FlightContext);

    const contextFlightsLength = flightContext?.flightData || [];

    const getFlights = async () => {

        const fromLocation = getSearchParamValue(searchParams, FROMLOCATION)
        const toLocation = getSearchParamValue(searchParams, TOLOCATION)
        const departureDate = getSearchParamValue(searchParams, DEPARTURE)
        const returnDate = getSearchParamValue(searchParams, RETURN)

        const requconFig = requestFlightsApiObject(fromLocation, toLocation, departureDate, returnDate );
    
        await sendRequest({requestConfig: requconFig, callback: flightContext?.setData || (()=>{})})
    };

    useEffect(()=>{
      getFlights()
    },[]);

    console.log(flightContext?.flightData)

    return (
        <div className={styles.parentTicketContainer}>
            <div className={styles.flighEditComponent}>
                'searchAdvance'
            </div>
            <div className={styles.mainFlightInfo}>
                <div className={styles.sidebarComponent}>
                    <div className={styles.sidebarTotal}>
                        <span><b>{contextFlightsLength.length}</b> Total flights avaiable</span>
                    </div>
                    side bar
                </div>
                <div className={styles.ticketArea}>
                    main
                </div>
            </div>
        </div>
    )
}

export default Container