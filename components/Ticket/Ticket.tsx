import styles from './ticket.module.css';
import { Button, } from '@mui/material';
import { PRIMARY } from '@/theme/theme';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

interface ticketProps {
    cityFrom?: string;
    cityTo?: string;
    departDate?: string;
    arriveDate?: string;
    link?:string;
    stops?:string;
    type?:string;
    airlines?:[];
    countryFrom?:string;
    countryTo?:string;
    durationDepart?:string;
    durationReturn?:string;
    price:string;
    departureFlights: string;
    returnFlights:string;
    departFlightDays:string;
}

const Ticket = ({ cityFrom, cityTo, price, arriveDate, departDate, departureFlights, returnFlights, departFlightDays}: ticketProps) => {

    const isGreenOrRed = ( departOrReturn: string ): string => {
        
        if(departOrReturn == '1'){
            return styles.circleGreen;
        }

        return styles.circleRed;
    };

    const smTxt = ( departOrReturn:string): JSX.Element => <b>{ departOrReturn > '1' && departOrReturn } </b>
        
    const isDirect = (departOrReturn: string): JSX.Element => <>{ departOrReturn == '1' ? 'Direct' : 'Stops' }</>

    return (
        <div className={styles.container}>

            <AddIcon style={{ fontSize: '18px' }}/>
            
            <div className={styles.headerContainer}>
                <div className={styles.subHeaderContainer}>
                    <span>{cityFrom}</span>
                    <span><b>{departDate}</b></span>
                </div>
                <div className={styles.line}>
                    <span className={styles.smTxt}>{smTxt(departureFlights)}</span>
                    <span className={`${isGreenOrRed(departureFlights)}`}></span>
                    <span className={styles.smTxt}>{isDirect(departureFlights)}</span>
                </div>
                <div className={styles.toContainer}>
                    <span>{cityTo}</span>
                    <span>
                        <b>{arriveDate}</b>
                        <span className={styles.tinyText}>{Number(departFlightDays) > 0 && `+${departFlightDays}`}</span>
                    </span>
                </div>
                
            </div>

            { Number(returnFlights) > 0 &&  
                <div className={styles.headerContainer}>
                    <div className={styles.subHeaderContainer}>
                        <span>{cityTo}</span>
                        <span><b></b></span>
                    </div>
                    <div className={styles.line}>
                        <span className={styles.smTxt}>{smTxt(returnFlights)}</span>
                        <span className={`${isGreenOrRed(returnFlights)}`}></span>
                        <span className={styles.smTxt}>{isDirect(returnFlights)}</span>
                    </div>
                    <div className={styles.toContainer}>
                        <span>{cityFrom}</span>
                        <span><b></b></span>
                    </div>
                    
                </div>
            }

            <div className={styles.priceContainer}>
                <span>{price}</span>
                <Button 
                    color={PRIMARY}
                    variant="contained"
                    sx={{'height':'3vh'}}
                >Details
                </Button>
            </div>
        </div>
    )
}

export default Ticket;