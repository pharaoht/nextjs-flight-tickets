'use client'
import useHttp from '@/hooks/useHttp';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import AirportLocationsList from './AirportLocationList';
import CustomFormInput from './Input';
import styles from './flightform.module.css';
import { getTodayDate, requestApiObject, getMinDate } from '@/util';
import { FROMLOCATION, TOLOCATION, DEPARTURE, RETURN} from '@/constants';
import useURLParams from '@/hooks/useUrlParams';

const FlightForm = () => {
    
    const router = useRouter();

    const { setUrlParams, getUrlParamsValue } = useURLParams();

    const [formState, setFormState] = useState<{ [key: string]: string }>({
        [FROMLOCATION]: getUrlParamsValue(FROMLOCATION),
        [TOLOCATION]: getUrlParamsValue(TOLOCATION),
        [DEPARTURE]: getUrlParamsValue(DEPARTURE),
        [RETURN]: getUrlParamsValue(RETURN),
    });
    
    const [fromAirportLocations, setFromAirportLocations] = useState([]);

    const [toAirportLocations, setToAirportLocations] = useState([]);

    const { isLoading: loadingFromLocations, sendRequest: getFromLocations } = useHttp();

    const { isLoading: loadingToLocations, sendRequest: getToLocations } = useHttp();


    const getFromAirports = async ( inputValue: string) => {

        if(inputValue === '') return setFromAirportLocations([]);

        const requestConfig = requestApiObject(inputValue);

        await getFromLocations({ requestConfig, callback: (data: { locations: []}) => {
            setFromAirportLocations(data.locations)
        }})

    };

    const getToApirports = async ( inputValue: string) => {

        if(inputValue === '') return setToAirportLocations([]);

        const requestConfig = requestApiObject(inputValue);

        await getToLocations({ requestConfig, callback: (data: { locations: []}) => {
            setToAirportLocations(data.locations);
        }});

    };

    const populateInput = (value: string, formInput: string) => {

        setFormState(prevState => ({
            ...prevState,
            [formInput]: value
        }));

        setFromAirportLocations([])
        setToAirportLocations([])

    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        router.replace(`/tickets?${params.toString()}`)
    }

    useEffect(() => {
        if(formState.toLocation != ''){
            setUrlParams(TOLOCATION, formState.toLocation);
        }
        getToApirports(formState.toLocation);
    }, [ formState.toLocation ])

    useEffect(() => {
        if(formState.departure != ''){
            setUrlParams(DEPARTURE, formState.departure);
        }
    }, [ formState.departure])

    useEffect(() => {
        if(formState.return != ''){
            setUrlParams(RETURN, formState.return);
        }
    }, [ formState.return ])

    useEffect(() => {
        getFromAirports(formState.fromLocation);
  
        if(formState.fromLocation != ''){
            setUrlParams(FROMLOCATION, formState.fromLocation);
        }

    }, [ formState.fromLocation ])


    return (
        <form className={styles.searchBox} onSubmit={(e) => onSubmit(e)}>
            <div>
                { (fromAirportLocations.length > 0 || loadingFromLocations) && 
                  <AirportLocationsList 
                    locationData={fromAirportLocations} 
                    onClickFunc={populateInput}
                    loadingState={loadingFromLocations}
                    formInput={FROMLOCATION}
                  />
                }
                <CustomFormInput 
                    title='From' 
                    type='text' 
                    name={FROMLOCATION}
                    placeHolder='JFK, LAX, more...'
                    formValue={formState.fromLocation}
                    setFormValue={setFormState}
                />
            </div>
            <div>
                { (toAirportLocations.length > 0 || loadingToLocations) && 
                  <AirportLocationsList 
                    locationData={toAirportLocations} 
                    onClickFunc={populateInput}
                    loadingState={loadingToLocations}
                    formInput={TOLOCATION}
                  />
                }
                <CustomFormInput 
                    title='To'
                    type='text'
                    name={TOLOCATION}
                    placeHolder='JFK, LAX, more...'
                    formValue={formState.toLocation}
                    setFormValue={setFormState}
                />
            </div>
            <div>
                <CustomFormInput 
                    title='Departure' 
                    type='date' 
                    name={DEPARTURE} 
                    placeHolder='When would you like to leave?' 
                    minDate={getTodayDate()} 
                    setFormValue={setFormState}
                    formValue={formState.departure}
                />
            </div>
            <div>
                <CustomFormInput 
                    title='Return' 
                    type='date' 
                    name={RETURN}
                    placeHolder='When would you like to return?'
                    minDate={getMinDate(formState.departure)}
                    setFormValue={setFormState}
                    isDisabled={!formState.departure && true }
                    formValue={formState.return}
                />            
            </div>
              <CustomFormInput title='&nbsp;' type='Submit' name='submit_btn' btnValue='Search' setFormValue={() => null}/>
        </form>
    )
};

export default FlightForm;