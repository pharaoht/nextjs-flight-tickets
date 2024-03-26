import Container from '@mui/material/Container/Container';
import styles from './ticket.module.css';
import { Box } from '@mui/material';

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
}

const Ticket = ({}: ticketProps) => {

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <span>FROM</span>
                <span>TO</span>
            </div>
        </div>
    )
}

export default Ticket;