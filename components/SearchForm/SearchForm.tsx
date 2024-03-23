import useHttp from '@/hooks/useHttp';
import Button from '@mui/material/Button';
import styles from './searchform.module.css';
import useURLParams from '@/hooks/useUrlParams';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useEffect, useState } from 'react';
import { formLocationData, requestApiObject } from '@/util';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, Box, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DEPARTURE, DIRECTION, FROMLOCATION, RETURN, TOLOCATION } from '@/constants';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';

const ONEWAY = 'oneWay';
const RETURNFLIGHT = 'return';

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
        [RETURN]:''
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
                    <ButtonGroup variant="contained">
                        <Button
                            color={selectedOption === ONEWAY ? 'primary' : 'secondary'}
                            onClick={() => handleParamChange(DIRECTION, 'oneWay')}
                        >
                            One-way
                        </Button>
                        <Button
                            color={selectedOption === RETURNFLIGHT ? 'primary' : 'secondary'}
                            onClick={() => handleParamChange(DIRECTION, 'return')}
                        >
                            Return
                            </Button>
                    </ButtonGroup>
                </div>
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
                                className={styles.textField}
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
                        id="fromLocation"
                        getOptionLabel={(option) => option.name} 
                        options={airportLocations}
                        renderInput={(params) => (
                            <TextField 
                                className={styles.textField}
                                variant="filled"
                                {...params} 
                                label="Destination"
                            />
                        )}
                    />
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker 
                            label="Departure" 
                            className={styles.textField}
                            minDate={moment()}
                            format="YYYY-MM-DD"

                        />
                        <DatePicker 
                            label="Return" 
                            className={styles.textField}
                            disabled={selectedOption === ONEWAY}
                            format="YYYY-MM-DD"

                        />
                        
                    </LocalizationProvider>
                </div>
            </Box>
        </form>
)
};

export default SearchForm;