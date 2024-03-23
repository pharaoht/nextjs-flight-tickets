import moment from 'moment';

const DASH_YYYYMMDD = 'YYYY-MM-DD';

const useDate = () => {

    const getFollowingDate = ( dateProvided: string ): string => {

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

    return {
        getFollowingDate,
        getPreviousDate,
        isDateInPast,
        isDateGreater,
        isDateLesser
    }
};

export default useDate;