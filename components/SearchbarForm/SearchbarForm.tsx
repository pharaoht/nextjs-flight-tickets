import useHttp from '@/hooks/useHttp';
import styles from './searchform.module.css';
import useURLParams from '@/hooks/useUrlParams';
import { useEffect, useState } from 'react';
import { formLocationData, requestApiObject } from '@/util';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, Box, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ADULTS, CABIN, CHILDREN, CURRENCY, DEPARTURE, DIRECTION, FROMLOCATION, INFANTS, RETURN, TOLOCATION, } from '@/constants';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import CabinSelection from '../Cabin/Cabin';
import CurrencySelection from '../Currency/Currency';
import PassengerField from '../Passengers/Passengers';
import DestinationButtonGroup from '../DestinationBtn/DestinationBtn';

const ONEWAY = 'oneWay';

interface Airport {
    name: string;
    id: string;
}

const SearchForm = () => {

    const [ airportLocations, setAirportLocations] = useState<Airport[]>([]);

    const [ formState, setFormState ] = useState({
        [FROMLOCATION]: '',
        [TOLOCATION]: '',
        [DEPARTURE]:'',
        [RETURN]:'',
        [CABIN]:' ',
        [ADULTS]:'1',
        [CHILDREN]:'0',
        [INFANTS]:'0',
        [CURRENCY]:'USD',
    });

    const { setUrlParams, getUrlParamsValue } = useURLParams();

    const { isLoading, sendRequest } = useHttp();

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

    return (
        <form className={styles.container}>
            <Box
                component="form"
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
                component="form"
                sx={{'& .MuiTextField-root': {width: '20vw' },}}
            >
                <div className={styles.inputContainer}>
                    <Autocomplete
                        filterOptions={(x) => x}
                        inputValue={formState[FROMLOCATION]}
                        onInputChange={(event, newInputValue) => handleFormStateChange(FROMLOCATION, newInputValue)}
                        loading={isLoading}
                        id="fromLocation"
                        getOptionLabel={(option) => option.name} 
                        options={airportLocations}
                        renderInput={(params) => (
                            <TextField 
                                className={styles.whiteBackGround}
                                variant="filled"
                                {...params} 
                                label="From"
                            />
                        )}
                    />
                    <Autocomplete
                        filterOptions={(x) => x}
                        inputValue={formState[TOLOCATION]}
                        onInputChange={(event, newInputValue) => handleFormStateChange(TOLOCATION, newInputValue)}
                        loading={isLoading}
                        id="toLocation"
                        getOptionLabel={(option) => option.name} 
                        options={airportLocations}
                        renderInput={(params) => (
                            <TextField 
                                className={styles.whiteBackGround}
                                variant="filled"
                                {...params} 
                                label="Destination"
                            />
                        )}
                    />
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker 
                            label="Departure" 
                            className={styles.whiteBackGround}
                            minDate={moment()}
                            format="YYYY-MM-DD"

                        />
                        <DatePicker 
                            label="Return" 
                            className={styles.whiteBackGround}
                            disabled={selectedOption === ONEWAY}
                            format="YYYY-MM-DD"

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
                    <CurrencySelection
                        handleChange={handleFormStateChange}
                        inputValue={formState[CURRENCY]}
                    />
                </div>
            </Box>
    </form>
)
};

export default SearchForm;