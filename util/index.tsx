import { FROMLOCATION, TOLOCATION } from '@/constants';
import moment from 'moment';


export const formatDateStringStamp = (inputDateString: string) => {

    return moment(inputDateString).format('h:mm A');
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
    console.log(route)
    route.forEach(item => {

        if(item.return === 0) departTotal++;
        else returnTotal++;

    })

    return { returnTotal, departTotal };
}

export const formatFlightData = ( flightData: any ) => {

    const data = flightData.data;

    const route = data[0]?.route;

    const layOverData = formatLayovers(route);

    const { returnTotal, departTotal } = layOverData;

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
            link: itm.deep_link,
            departureFlights: `${departTotal}`,
            returnFlights: `${returnTotal}`,
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
    }

    let isOneWay = false;

    const baseStr = 'vehicle_type=aircraft&dtime_from=0:00&dtime_to=24:00&atime_from=0:00&atime_to=24:00&locale=en';
    const retStr = '&ret_dtime_from=0:00&ret_dtime_to=24:00&ret_atime_from=0:00&ret_atime_to=24:00';
    const lstStr = '&limit=25';

    let qStr = '';
    params.map((itm, idx) => {

        if(queryParams.hasOwnProperty(itm.key)){
            const keyName = itm.key;
            if(typeof queryParams[keyName] === 'string'){
                if(keyName === 'fromLocation' || 'toLocation'){
                    
                     return qStr += `${queryParams[keyName]}=${itm.value.substring(0,3)}&`
                }
                qStr += `${queryParams[keyName]}=${itm.value}&`
            }
            else{
                if(!itm.value){
                    isOneWay = true;
                    return;
                }
                qStr += `${queryParams[keyName][0]}=${itm.value}&${queryParams[keyName][1]}=${itm.value}&`
            }
            
        }
    });

    return qStr + baseStr + `${isOneWay ? lstStr : retStr + lstStr}`
}