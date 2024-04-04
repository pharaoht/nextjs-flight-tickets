import useURLParams from '@/hooks/useUrlParams';
import styles from './searchAdvance.module.css';
import { DEPARTURE, FROMLOCATION, RETURN, TOLOCATION } from '@/constants';
import useDate from '@/hooks/useDate';
import { Suspense, useEffect, useState } from 'react';
import SearchForm from '../SearchbarForm/SearchbarForm';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button/Button';

interface SearchAdvanceProps {
    getFlights: (...args:any) => void;
}


const Searchbar = ({ getFlights }: SearchAdvanceProps) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const [init, setInit] = useState(true);

    const { getUrlParamsValue, setUrlParams } = useURLParams();

    const { getFollowingDate, getPreviousDate, isDateInPast, isDateGreater, isDateLesser } = useDate();

    const departureDate = getUrlParamsValue(DEPARTURE);

    const returnDate = getUrlParamsValue(RETURN);

    const fromAirportLocation = getUrlParamsValue(FROMLOCATION);

    const toAirportLocation = getUrlParamsValue(TOLOCATION);

    const incrementDate = ( paramName: string ): void => {

        const paramDateValue = getUrlParamsValue(paramName)

        const followingDate = getFollowingDate(paramDateValue);

        if(paramName === DEPARTURE){

            if(isDateGreater(followingDate, returnDate)){
                return undefined;
            }
        }

        setUrlParams(paramName, followingDate);

        return undefined;
    };

    const decrementDate = ( paramName: string ): void => {

        const paramDateValue = getUrlParamsValue(paramName);

        const previousDate = getPreviousDate(paramDateValue);

        if(paramName === RETURN){

            if(isDateLesser(departureDate, previousDate)){
                return undefined;
            }
        }

        if(isDateInPast(previousDate)){
            return undefined
        }

        setUrlParams(paramName, previousDate);

        return undefined;
    }

    useEffect(()=>{

        if(init){
            setInit(false)
            return
        }
     
        getFlights()

    },[departureDate, returnDate])

    return (
        <div className={styles.headerSection} >
            <div className={styles.sdMainSearchContainer}>
                <div className={styles.sdSeprator}>
                    <div className={styles.sdHolder}>
                        <div className={styles.sdsrchholder}>
                            <Button 
                                color={isExpanded ? 'error' : 'primary'}
                                variant="contained"
                                size='small'
                                onClick={() => setIsExpanded(prev => !prev)}
                            >{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </Button>

                        </div>
                        <div className={styles.sdAirportHolder}>
                            <h2 className={styles.sdh2}>{fromAirportLocation}</h2>
                            <span className={styles.sdh2}>{`->`}</span>
                            <h2 className={styles.sdh2}>{toAirportLocation}</h2>
                        </div>
                    </div>
                    <div className={`${styles.sdDates}`}>
                        <div className={styles.sdDate}>
                            <span className={styles.sdChev} onClick={() => decrementDate(DEPARTURE)}>{'<'}</span>
                            <span>{departureDate}</span>
                            <span className={styles.sdChev} onClick={() => incrementDate(DEPARTURE)}>{'>'}</span>
                        </div>
                        <div className={styles.sddate}>
                            { returnDate && (
                                    <>
                                        <span className={styles.sdChev} onClick={() => decrementDate(RETURN)}>{'<'}</span>
                                        <span>{returnDate}</span>
                                        <span className={styles.sdChev} onClick={() => incrementDate(RETURN)}>{'>'}</span>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                { isExpanded && <Suspense fallback={<>loading</>}><SearchForm setExpanded={setIsExpanded}/> </Suspense>}
            </div>
        </div>
    )
};

export default Searchbar;