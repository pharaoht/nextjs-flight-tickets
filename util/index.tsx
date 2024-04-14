import { CURRENCIES, ONEWAY } from '@/constants';
import moment from 'moment';


export const formatDateStringStamp = (inputDateString: string) => {
    if(inputDateString === null) return '';

    return moment(inputDateString).format('h:mm a');
}

export const calculateDays = (departureTime: string, arrivalTime: string ): string => {

    if(departureTime === null || arrivalTime === null) return '';

    const momentDate1 = moment(departureTime, 'YYYY/MM/DD');
    const momentDate2 = moment(arrivalTime, 'YYYY/MM/DD');

    const differenceDays = momentDate2.diff(momentDate1, 'days');

    return String(differenceDays)

}

export const secondsToHours = (seconds: number): string => {

    return String(Math.ceil(seconds / 3600)); 

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

export const requestFlightsApiObject = ( url: string) => {

    const APIKEY = process.env.NEXT_PUBLIC_API_KEY;

    return {
        url: `https://tequila-api.kiwi.com/v2/search?${url}`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            apikey: `${APIKEY}`
        }
    }
}

export const formatLayovers = (route: any[]): { returnTotal: Number, departTotal: Number } => {

    let returnTotal = 0;
    let departTotal = 0;

    route.forEach(item => {

        if(item.return === 0) departTotal++;
        else returnTotal++;

    })

    return { returnTotal, departTotal };
}

export const getReturnFlightTimes = (route: any[]) => {

    if(route.length === 0) return;

    const returnFlights = route.filter(itm => itm.return === 1 && itm );

    const lastIndex = returnFlights.length - 1;

    if(returnFlights.length > 1){

        const departTime = returnFlights[0].local_departure;

        const arriveTime = returnFlights[lastIndex].local_arrival;

        return { departTime, arriveTime}
    }

    const departTime = returnFlights[0].local_departure;
    const arriveTime = returnFlights[0].local_arrival;

    return { departTime, arriveTime }

}

export const matchCurrency = (curr: string) => {

    const currLabel = CURRENCIES.find(itm => itm.value.toLowerCase() === curr.toLowerCase())?.label;

    const sign = currLabel?.split(' ')[0];
    const name = currLabel?.split(' ')[1];
    return [sign, name]
}

export const formatFlightData = ( flightData: any ) => {

    const data = flightData.data;

    const formattedData = data.map((itm: any) => {

        const route = itm.route;

        const { returnTotal, departTotal }  = formatLayovers(route);

        const returnTimes = Number(returnTotal) > 0 ? getReturnFlightTimes(route) : null

        const returnDepartTime = returnTimes ? returnTimes.departTime: null
        const returnArriveTime = returnTimes ? returnTimes.arriveTime: null

        return {
            cityFromCode: itm.cityFrom,
            cityToCode: itm.cityTo,
            airportFromCode: itm.flyFrom,
            airportToCode: itm.flyTo,
            farePrice: `${Math.round(itm.price)}`,
            countryFromName: itm.countryFrom.name,
            countryToName: itm.countryTo.name,
            localArrival: formatDateStringStamp(itm.local_arrival),
            localDeparture: formatDateStringStamp(itm.local_departure),
            returnDepartLocal: formatDateStringStamp(returnDepartTime),
            returnArrivalLocal: formatDateStringStamp(returnArriveTime),
            link: itm.deep_link,
            departureFlights: `${departTotal}`,
            returnFlights: `${returnTotal}`,
            durationDeparture: secondsToHours(itm.duration.departure),
            durationReturn: secondsToHours(itm.duration.return),
            totalDuration: secondsToHours(itm.duration.total),
            flightDaysDepart: calculateDays(itm.local_departure, itm.local_arrival),
            flightDaysReturn: calculateDays(returnDepartTime, returnArriveTime),
            id:`${itm.price}${itm.quality}${itm.utc_arrival}`
        }
    });

    return formattedData

}


export const formLocationData = ( locationData: any) => {

    const trimInternational = ( airporLocation: string ) => {
    
        return airporLocation.replace(/International/g, 'Int');
    }
    
    const data = locationData.locations;

    const formattedData = data.map((itm:any) => {
        const country = itm.city.country.name;
        return {
            id: itm.id,
            name: `${itm.id} - ${country}`
        }
    })

    return formattedData
}


export const getFlightParamBuilder = ( params: { key:string, value:string }[] ) => {

    const queryParams: Record<string, string | string[]> = {
        fromLocation:'fly_from',
        toLocation:'fly_to',
        departure:['dateFrom', 'dateTo'],
        return: ['return_to', 'return_from'],
        adults: 'adults',
        children: 'children',
        infants: 'infants',
        cabin: 'selected_cabins',
        currency: 'curr',
        dObTimeFrom:'dtime_from',
        dObTimeTo:'dtime_to',
        dArrTimeFrom:'atime_from',
        dArrTimeTo:'atime_to',
        rObTimeFrom:'ret_dtime_from',
        rObTimeTo:'ret_dtime_to',
        rArrTimeFrom:'ret_atime_from',
        rArrTimeTo:'ret_atime_to',
        duration: 'max_fly_duration',
    }

    const fixedParams = {
        'vehicle_type': 'aircraft',
        'locale':'en',
        'limit':'25'
    }

    const queryString = params.map((itm) => {
        
        if(queryParams.hasOwnProperty(itm.key)){

            const keyName = itm.key;
            const value = itm.value;

            if(itm.value === '') return;

            if(typeof queryParams[keyName] === 'string'){
                
                if(keyName === 'fromLocation' || keyName === 'toLocation'){

                    return `${queryParams[keyName]}=${value.substring(0,3)}`
                }

                return `${queryParams[keyName]}=${value}`
            }
            else if(typeof queryParams[keyName] === 'object'){
                
                return `${queryParams[keyName][0]}=${value}&${queryParams[keyName][1]}=${value}`
            }
        }
    })
    .filter(Boolean)
    .join('&')

    //object.entries return object to an mapable array
    const fixedqueryString = Object.entries(fixedParams).map(([key, value]) => {
        return `${key}=${value}`
    }).join('&')

    return [queryString,fixedqueryString].join('&')
}