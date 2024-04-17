import styles from './ticket.module.css';
import { Button, } from '@mui/material';
import { PRIMARY } from '@/theme/theme';
import AddIcon from '@mui/icons-material/Add';
import { matchCurrency } from '@/util';

interface ticketProps {
    cityFrom?: string;
    cityTo?: string;
    departDate?: string;
    arriveDate?: string;
    returnDepartDate?: string;
    returnArriveDate?:string;
    link?:string;
    stops?:string;
    type?:string;
    airlines?:[];
    countryFrom?:string;
    countryTo?:string;
    durationDepart?:string;
    durationReturn?:string;
    totalDuration:string;
    price:string;
    departureFlights: string;
    returnFlights:string;
    departFlightDays:string;
    returnFlightDays:string;
    toggleDialog: () => void;
    setSelectedFlights: (...args: any) => void;
    currency:string;
    modalRouteDataSource:any[];
}

const Ticket = (
    { 
        cityFrom, cityTo, price, arriveDate, totalDuration, departDate, departureFlights, returnFlights, departFlightDays, 
        returnFlightDays, returnDepartDate, returnArriveDate, link, stops, type, airlines, countryFrom, countryTo, durationDepart, durationReturn,
        toggleDialog, setSelectedFlights, currency, modalRouteDataSource
    
    }: ticketProps ) => {

    const isGreenOrRed = ( departOrReturn: string ): string => {
        
        if(departOrReturn == '1'){
            return styles.circleGreen;
        }

        return styles.circleRed;
    };

    const smTxt = ( departOrReturn:string): JSX.Element => <b>{ departOrReturn > '1' && departOrReturn } </b>
        
    const isDirect = (departOrReturn: string): JSX.Element => <>{ departOrReturn == '1' ? 'Direct' : 'Stops' }</>

    const handleButtonClick = () => {

        const itemData = {
            cityFrom,
            cityTo,
            departDate,
            arriveDate,
            returnDepartDate,
            returnArriveDate,
            link,
            stops,
            type,
            airlines,
            countryFrom,
            countryTo,
            durationDepart,
            durationReturn,
            totalDuration,
            price,
            departureFlights,
            returnFlights,
            departFlightDays,
            returnFlightDays,
            modalRouteDataSource
        }
    
        setSelectedFlights(itemData);
        toggleDialog();
    }

    const displayCurrency = (curr: string, price:string) => {
        const curLabel = matchCurrency(curr)
        return `${curLabel[0]}${price} ${curLabel[1]}`;
    }

    return (
        <div className={styles.container}>

            <AddIcon style={{ fontSize: '18px' }}/>
            
            <div className={styles.headerContainer}>
                <div className={styles.subHeaderContainer}>
                    <span>{cityFrom}</span>
                    <span><b className={styles.tinyDate}>{departDate}</b></span>
                </div>
                <div className={styles.line}>
                    <span className={styles.smTxt}>{smTxt(departureFlights)}</span>
                    <span className={`${isGreenOrRed(departureFlights)}`}></span>
                    <span className={styles.smTxt}>{isDirect(departureFlights)}</span>
                </div>
                <div className={styles.toContainer}>
                    <span>{cityTo}</span>
                    <span>
                        <b className={styles.tinyDate}>{arriveDate}</b>
                        { Number(departFlightDays) > 0 &&
                            <span className={styles.tinyText}>
                                {Number(departFlightDays) > 0 && `+${departFlightDays}`}
                            </span>
                        }
                    </span>
                </div>
                
            </div>

            { Number(returnFlights) > 0 &&  
                <div className={styles.headerContainer}>
                    <div className={styles.subHeaderContainer}>
                        <span>{cityTo}</span>
                        <span>
                            <b className={styles.tinyDate}>{returnDepartDate}</b>
                        </span>
                    </div>
                    <div className={styles.line}>
                        <span className={styles.smTxt}>{smTxt(returnFlights)}</span>
                        <span className={`${isGreenOrRed(returnFlights)}`}></span>
                        <span className={styles.smTxt}>{isDirect(returnFlights)}</span>
                    </div>
                    <div className={styles.toContainer}>
                        <span>{cityFrom}</span>
                        <span>
                            <b className={styles.tinyDate}>{returnArriveDate}</b>
                            
                            { Number(returnFlightDays) > 0 &&
                                <span className={styles.tinyText}>
                                    {Number(returnFlightDays) > 0 && `+${returnFlightDays}`}
                                </span>
                            }
                        </span>
                    </div>
                    
                </div>
            }

            <div className={styles.priceContainer}>
                <span>{displayCurrency(currency, price)}</span>
                <Button 
                    color={PRIMARY}
                    variant="contained"
                    sx={{'height':'3vh'}}
                    onClick={handleButtonClick}
                >Details
                </Button>
            </div>
        </div>
    )
}

export default Ticket;