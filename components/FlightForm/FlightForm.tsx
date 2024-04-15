'use client'
import moment from 'moment';
import useDate from '@/hooks/useDate';
import useHttp from '@/hooks/useHttp';
import { useRouter } from 'next/navigation';
import styles from './flightform.module.css';
import { AirportLocationType } from '@/types';
import useURLParams from '@/hooks/useUrlParams';
import Button from '@mui/material/Button/Button';
import SearchIcon from '@mui/icons-material/Search';
import { formLocationData, requestApiObject} from '@/util';
import React, { FormEvent, useEffect, useState } from 'react';
import AirportLocationField from '../AirportLocation/AirportLocation';
import { DatePicker } from '@mui/x-date-pickers/DatePicker/DatePicker';
import { FROMLOCATION, TOLOCATION, DEPARTURE, RETURN, DIRECTION, ONEWAY} from '@/constants';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import DestinationButtonGroup from '../DestinationBtn/DestinationBtn';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from '@/theme/theme';

const FlightForm = () => {
    
    const router = useRouter();

    const { getFollowingDate } = useDate();

    const { isLoading, sendRequest } = useHttp();

    const { setUrlParams, getUrlParamsValue } = useURLParams();

    const [formState, setFormState] = useState<{ [key: string]: string }>({
        [FROMLOCATION]: '',
        [TOLOCATION]: '',
        [DEPARTURE]: '',
        [RETURN]: '',
        [DIRECTION]:''
    });

    const [ airportLocations, setAirportLocations] = useState<AirportLocationType[]>([]);    

    const getAirports = async ( inputValue: string) => {

        if(inputValue === '') return setAirportLocations([]);

        const requestConfig = requestApiObject(inputValue);

        await sendRequest({ requestConfig, callback: (data: { locations: []}) => {
            const formatData = formLocationData(data)
            setAirportLocations(formatData)
        }})

    };

    const validateForm = (): boolean =>{
        let isValid = true;
        const pattern = /^[A-Za-z]{3}\s-\s/;

        if(pattern){

        }              
        return isValid;
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        router.replace(`/tickets?${params.toString()}`)
    }


    const loadParams = ( ) => Object.entries(formState).map(([key, value]) => {
        
        const paramValue = getUrlParamsValue(key);

        if(paramValue){
            setFormState(prev => ({
                ...prev,
                [key]: paramValue
            }));
        }
    })

    const handleOnChange = ( key: string, value: string, event:any) => {

        if(value == ''){

            if(event && event.nativeEvent.inputType === 'deleteContentBackward'){
    
                setFormState(prev => ({
                    ...prev,
                    [key]: value
                }));

                setUrlParams(key, value)

                return;
            }

            return;
        }

        setFormState(prev => ({
            ...prev,
            [key]: value
        }));

        setUrlParams(key, value)
    
    }

    useEffect(() => {

        const timer = setTimeout(()=>{
            getAirports(formState[FROMLOCATION])
        }, 500)

        return () => clearTimeout(timer)
    }, [formState[FROMLOCATION]]);

    useEffect(() => {

        const timer = setTimeout(()=>{
            getAirports(formState[TOLOCATION])
        }, 500)

        return () => clearTimeout(timer)
    }, [formState[TOLOCATION]]);

    useEffect(() => { loadParams() },[])

    return (
        <ThemeProvider theme={theme}>
            <form className={styles.searchBox} onSubmit={(e) => onSubmit(e)}>
                <DestinationButtonGroup
                    selectedOption={formState[DIRECTION]}
                    handleParamChange={handleOnChange}
                    customCss={styles.destinationBtn}
                />
                <AirportLocationField 
                    inputValue={formState[FROMLOCATION]}
                    onInputChange={handleOnChange}
                    loading={isLoading}
                    id={'fromLocationHome'}
                    options={airportLocations}
                    label='From'
                    className={styles.whiteBackGround}
                    paramType={FROMLOCATION}   
                />
                <AirportLocationField
                    inputValue={formState[TOLOCATION]}
                    onInputChange={handleOnChange}
                    loading={isLoading}
                    id={'toLocationHome'}
                    options={airportLocations}
                    label='Destination'
                    className={styles.whiteBackGround}
                    paramType={TOLOCATION}
                />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker 
                        label="Departure" 
                        className={styles.whiteBackGround}
                        minDate={moment()}
                        format="YYYY-MM-DD"
                        value={formState[DEPARTURE] ? moment(formState[DEPARTURE]) : null}
                        onChange={(newValue) => handleOnChange(DEPARTURE, String(moment(newValue).format('YYYY-MM-DD')), '')}
                    />
                    <DatePicker 
                        label="Return" 
                        minDate={moment(getFollowingDate(formState[DEPARTURE]))}
                        className={styles.whiteBackGround}
                        disabled={formState[DIRECTION] === ONEWAY ? true : false}
                        format="YYYY-MM-DD"
                        value={formState[RETURN] ? moment(formState[RETURN]) : null}
                        onChange={(newValue) => handleOnChange(RETURN, String(moment(newValue).format('YYYY-MM-DD')), '')}
                    />
                </LocalizationProvider>
                <Button className={styles.findBtn} type='submit' id='btn-find-Home' variant="contained" endIcon={<SearchIcon />} onClick={()=>{}}>
                    Find
                </Button>
            </form>
        </ThemeProvider>
    )
};

export default FlightForm;