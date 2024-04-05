import moment from 'moment';

const DASH_YYYYMMDD = 'YYYY-MM-DD';

const useDate = () => {
    
    const getTodayDate = () => moment().format('YYYY-MM-DD');

    const getFollowingDate = ( dateProvided: string ): string => {

        if(dateProvided === ''){
            return ''
        }
        
        const currentDate = moment(dateProvided);
        
        const followingDate = currentDate.add(1, 'days');
        
        return followingDate.format(DASH_YYYYMMDD);
    }

    const getPreviousDate = (dateProvided: string): string => {

        const currentDate = moment(dateProvided);

        const previousDate = currentDate.subtract(1, 'days');

        return previousDate.format(DASH_YYYYMMDD);
    }

    const isDateInPast = ( dateProvided: string ): boolean => {

        const dateToCheck = moment(dateProvided);

        const currentDate = moment();

        const isInPast = dateToCheck.isBefore(currentDate, 'day');

        return isInPast;
    }

    const isDateGreater = ( departureDate: string, returnDate: string): boolean => {

        return moment(departureDate).isAfter(returnDate);
    }

    const isDateLesser = ( departure: string, returDate: string,): boolean => {
        return moment(returDate).isBefore(departure);
    }

    const toAmPmformat = ( time24hr: string ): string => {

        const time12hr = moment(time24hr, 'HH:mm').format('h:mma');

        return time12hr;

    }

    return {
        getFollowingDate,
        getPreviousDate,
        getTodayDate,
        isDateInPast,
        isDateGreater,
        isDateLesser,
        toAmPmformat,
    }
};

export default useDate;