export type CabinSelectionType = {
    name: string;
    value: string;
}

export type CurrenciesType = {
    value: string;
    label: string;
}

export type AirportLocationType = {
    name: string;
    id: string;
}

export type modalDataSourceProps = {
    airline:string;
    airportCodeFrom: string;
    airportCodeTo: string;
    arriveTime: string; 
    cityFrom: string; 
    cityTo: string; 
    departTime: string; 
    duration: string; 
    fareCategory: string; 
    flightNum: number; 
    return: number;
}