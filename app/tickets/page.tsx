'use client'
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import useHttp from '@/hooks/useHttp';


const Ticketing = () => {

    const searchParams = useSearchParams();

    const [flights, setFlights] = useState([]);

    const { isLoading, sendRequest } = useHttp()

    const getFlights = async () => {

        const requconFig = {
            url: `http://${window.location.host}/api/flights`,
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        }
        function getData(data: string){
            console.log(data)
        }
        const data = await sendRequest({requestConfig: requconFig, callback: getData})
    };

    useEffect(()=> {
        getFlights()
    }, [])

    return (
        <div>page</div>
    )
}

export default Ticketing