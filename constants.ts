import { CabinSelectionType, CurrenciesType } from "./types";

//searchParams
export const FROMLOCATION = 'fromLocation';
export const TOLOCATION = 'toLocation';
export const DEPARTURE = 'departure';
export const RETURN = 'return';
export const CABIN = 'cabin';
export const ADULTS = 'adults';
export const CHILDREN = 'children';
export const INFANTS = 'infants';
export const PRICEFROM = 'priceFrom';
export const PRICETO = 'priceTo';
export const DIRECTION = 'direction';
export const CURRENCY = 'currency'


//page consts
export const DESTINATIONS = 'destinations';
export const TIPS = 'tips';
export const NEWSLETTER = 'newsletter'


//simpleVariables
export const ONEWAY = 'oneWay';


//prefilled data for search api, value from Documentation
export const CABINSELECTIONS: CabinSelectionType[] = [
    { name: 'Economy', value: 'M'},
    { name: 'Premium Economy', value: 'W'},
    { name: 'Business Class', value: 'C'},
    { name: 'First Class', value: 'F'}
];

export const CURRENCIES: CurrenciesType[] = [
  { value: 'USD', label: '$ USD', },
  { value: 'EUR', label: '€ EUR', },
  { value: 'GBP', label: '£ GBP', },
  { value: 'JPY', label: '¥ JPY', },
];

