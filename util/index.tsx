import moment from 'moment';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const getTodayDate = () => moment().format('YYYY-MM-DD');

export const getMinDate = (date: string) => {

    if(date === ''){
        return ''
    }

  const parsedDate = moment(date);

  const minDate = parsedDate.add(1, 'day');

  return minDate.format('YYYY-MM-DD');
}

export const formatDateStringStamp = (inputDateString: string) => {

    return moment(inputDateString).format('MM/DD/YYYY hh:mm A');
}

export const requestApiObject = ( searchvalue: string ) => {

    const APIKEY = process.env.NEXT_PUBLIC_API_KEY;

    return {
        url: `https://tequila-api.kiwi.com/locations/query?term=${searchvalue}&locale=en-US&location_types=airport&limit=10&active_only=true`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            apikey: `${APIKEY}`
        }
    }
}

export const requestFlightsApiObject = ( from?:string, destination?:string, departureDate?: string, returnDate?: string) => {

    const APIKEY = process.env.NEXT_PUBLIC_API_KEY;

    return {
        url: `https://tequila-api.kiwi.com/v2/search?fly_from=${from?.substring(0,3)}&fly_to=${destination?.substring(0,3)}&dateFrom=${departureDate}&dateTo=${departureDate}&return_to=${returnDate}&return_from=${returnDate}&vehicle_type=aircraft&dtime_from=0:00&dtime_to=24:00&atime_from=0:00&atime_to=24:00&ret_dtime_from=0:00&ret_dtime_to=24:00&ret_atime_from=0:00&ret_atime_to=24:00&curr=USD&locale=en&limit=50`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            apikey: `${APIKEY}`
        }
    }
}

export const getSearchParamValue = (searchParamObject: ReadonlyURLSearchParams, paramName: string) => {

    const value = searchParamObject.get(paramName) || '';

    return String(value);
}

export const formatFlightData = ( flightData: any) => {

    const data = flightData.data;

    const formattedData = data.map((itm: any) => {
        return {
            cityFromCode: itm.cityFrom,
            cityToCode: itm.cityTo,
            airportFromCode: itm.flyFrom,
            airportToCode: itm.flyTo,
            farePrice: `$${itm.price} USD`,
            countryFromName: itm.countryFrom.name,
            countryToName: itm.countryTo.name,
            localArrival: formatDateStringStamp(itm.local_arrival),
            localDeparture: formatDateStringStamp(itm.local_departure),
            link: itm.deep_link
        }
    });

    return formattedData

}