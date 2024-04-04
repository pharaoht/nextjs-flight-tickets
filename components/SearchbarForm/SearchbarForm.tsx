import moment from 'moment';
import useHttp from '@/hooks/useHttp';
import useDate from '@/hooks/useDate';
import CabinSelection from '../Cabin/Cabin';
import { Box, Button, } from '@mui/material';
import styles from './searchform.module.css';
import { AirportLocationType } from '@/types';
import useURLParams from '@/hooks/useUrlParams';
import SearchIcon from '@mui/icons-material/Search';
import CurrencySelection from '../Currency/Currency';
import PassengerField from '../Passengers/Passengers';
import { MouseEvent , useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formLocationData, requestApiObject } from '@/util';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import DestinationButtonGroup from '../DestinationBtn/DestinationBtn';
import AirportLocationField from '../AirportLocation/AirportLocation';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ADULTS, CABIN, CHILDREN, CURRENCY, DEPARTURE, DIRECTION, FROMLOCATION, INFANTS, RETURN, TOLOCATION, ONEWAY } from '@/constants';


interface searchFormProps {
    setExpanded: (...args:any) => void;
}

const SearchForm = ({ setExpanded }:searchFormProps) => {

    const { setUrlParams, setMultipleUrlParams, getUrlParamsValue } = useURLParams();

    const [ airportLocations, setAirportLocations] = useState<AirportLocationType[]>([]);

    const [ formState, setFormState ] = useState({
        [FROMLOCATION]: '',
        [TOLOCATION]: '',
        [DEPARTURE]: '',
        [RETURN]: '',
        [CABIN]:'M',
        [ADULTS]:'1',
        [CHILDREN]:'0',
        [INFANTS]:'0',
        [CURRENCY]:'USD',
    });

    const { isLoading, sendRequest } = useHttp();

    const { getFollowingDate } = useDate()

    const selectedOption = getUrlParamsValue(DIRECTION);

    const handleParamChange = (paramName: string, value: string): void => {

        setUrlParams(paramName, value)
    };

    const getAirports = async ( inputValue: string) => {

        if(inputValue === '') return setAirportLocations([]);

        const requestConfig = requestApiObject(inputValue);

        await sendRequest({ requestConfig, callback: (data: { locations: []}) => {
            const formatData = formLocationData(data)
            setAirportLocations(formatData)
        }})

    };

    const handleFormStateChange = (key: string, value: string) => {
        setFormState(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const validateForm = () => {
        let isError = false;
        for(const key in formState){
            //add logic to validate
           
        }
    }

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        validateForm()
        setMultipleUrlParams(formState);
        setExpanded(false);
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

    useEffect(() => {
        if(selectedOption === ONEWAY){
            handleFormStateChange(RETURN, '')
        }
    }, [selectedOption])

    return (
        <div className={styles.container}>
            <Box
                sx={{'& .MuiTextField-root': {width: '20vw' },}}
            >
                <div>
                   <DestinationButtonGroup
                        selectedOption={selectedOption}
                        handleParamChange={handleParamChange}
                   />
                </div>
            </Box>
            <Box
                sx={{
                    '& .MuiTextField-root': {
                        width: '20vw', // Default width
                        '@media (max-width: 1100px)': {
                            width: '15vw',
                        },
                        '@media (max-width: 991px)': {
                            width: '100%',
                        },
                    }
                }}
            >
                <div className={styles.inputContainer}>
                    <AirportLocationField
                        inputValue={formState[FROMLOCATION]}
                        onInputChange={handleFormStateChange}
                        loading={isLoading}
                        id={'fromLocation'}
                        options={airportLocations}
                        label='From'
                        className={styles.whiteBackGround}
                        paramType={FROMLOCATION}
                    />
                    <AirportLocationField
                        inputValue={formState[TOLOCATION]}
                        onInputChange={handleFormStateChange}
                        loading={isLoading}
                        id={'toLocation'}
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
                            onChange={(newValue) => handleFormStateChange(DEPARTURE, String(moment(newValue).format('YYYY-MM-DD')))}
                        />
                        <DatePicker 
                            label="Return" 
                            minDate={moment(getFollowingDate(formState[DEPARTURE]))}
                            className={styles.whiteBackGround}
                            disabled={selectedOption === ONEWAY}
                            format="YYYY-MM-DD"
                            value={formState[RETURN] ? moment(formState[RETURN]) : null}
                            onChange={(newValue) => handleFormStateChange(RETURN, String(moment(newValue).format('YYYY-MM-DD')))}

                        />
                    </LocalizationProvider>
                </div>
            </Box>
            <Box
                component="form"
                sx={{'& .MuiTextField-root': { },}}
            >
                <div className={styles.filterContainer}>
                    <CabinSelection 
                        handleChange={handleFormStateChange}
                        inputValue={formState[CABIN]}
                    />
                    <div className={styles.passengerRow}>
                        <PassengerField
                            label='Adults'
                            id='adultField'
                            className={`${styles.whiteBackGround} ${styles.small}`}
                            value={formState[ADULTS]}
                            inputProps={{ min: 0, max: 9 }}
                            paramName={ADULTS}
                            handleChange={handleFormStateChange}
                        />
                        <PassengerField
                            label='Children'
                            id='childrenField'
                            className={`${styles.whiteBackGround} ${styles.small}`}
                            value={formState[CHILDREN]}
                            inputProps={{ min: 0, max: 9 }}
                            paramName={CHILDREN}
                            handleChange={handleFormStateChange}
                        />
                        <PassengerField
                            label='Infants'
                            id='infantsField'
                            value={formState[INFANTS]}
                            className={`${styles.whiteBackGround} ${styles.small}`}
                            inputProps={{ min: 0, max: 9, }}
                            paramName={INFANTS}
                            handleChange={handleFormStateChange}
                        />
                    </div>
                    <CurrencySelection
                        handleChange={handleFormStateChange}
                        inputValue={formState[CURRENCY]}
                    />
                    <Button variant="contained" endIcon={<SearchIcon />} onClick={handleSubmit}>
                        Find
                    </Button>
                </div>
            </Box>
    </div>
)
};

export default SearchForm;