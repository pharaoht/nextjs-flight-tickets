import Container from '@mui/material/Container/Container';
import styles from './ticket.module.css';
import { Box, Button } from '@mui/material';

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
}

const Ticket = ({ cityFrom, cityTo, price, arriveDate, departDate}: ticketProps) => {

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.subHeaderContainer}>
                    <span>{cityFrom}</span>
                    <span>{departDate}</span>
                </div>
                <div className={styles.line}>
                    <span className={styles.smTxt}>1</span>
                    <span className={styles.circle}></span>
                    <span className={styles.smTxt}>stop</span>
                </div>
                <div className={styles.toContainer}>
                    <span>{cityTo}</span>
                    <span>{arriveDate}</span>
                </div>
            </div>
            <div className={styles.priceContainer}>
                <span>{price}</span>
                <Button 
                    color={'primary'}
                    variant="contained"
                    sx={{'height':'3vh'}}
                >See more details
                </Button>
            </div>
        </div>
    )
}

export default Ticket;