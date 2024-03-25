import moment from 'moment';

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


export const formLocationData = ( locationData: any) => {

    const trimInternational = ( airporLocation: string ) => {
    
        return airporLocation.replace(/International/g, 'Int');
    }
    
    const data = locationData.locations;

    const formattedData = data.map((itm:any) => {
        const country = itm.city.country.name;
        return {
            id: itm.id,
            name: `${itm.id} - ${trimInternational(itm.name)} - ${country}`
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

    const endString = 'vehicle_type=aircraft&dtime_from=0:00&dtime_to=24:00&atime_from=0:00&atime_to=24:00&ret_dtime_from=0:00&ret_dtime_to=24:00&ret_atime_from=0:00&ret_atime_to=24:00&locale=en&limit=50';
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
                
                qStr += `${queryParams[keyName][0]}=${itm.value}&${queryParams[keyName][1]}=${itm.value}&`
            }
            
        }
    });

    return qStr + endString;
}