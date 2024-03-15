'use client'
import React from "react";
import styles from './airportlocations.module.css';

interface airportLocationInterface {
    locationData: detailsLocation[];
    onClickFunc: (...args: any[]) => void;
    loadingState: boolean;
    formInput: string;
};

interface detailsLocation {
    id: string;
    code: string;
    name:string;
    city: {
        country: {
            name: string
        }
    }
}

const AirportLocationsList = ({ locationData, onClickFunc, loadingState, formInput } : airportLocationInterface) => {

    const trimInternational = ( airporLocation: string ) => {
    
        return airporLocation.replace(/International/g, 'Int');
    }

    return (
        <div className={styles.airport_holder}>
            { loadingState ? <> Getting airport info...</> :
                <ul className={styles.location_holder}>
                    {locationData.map((itm, idx) => {
                        return (
                            <li className={styles.airports} 
                                key={itm.id} 
                                onClick={() => onClickFunc(`${itm.code} - ${itm.city.country.name}`, formInput)}>
                                <b>{itm.code}</b>
                                {` - ${trimInternational(itm.name)} - ${itm.city.country.name} `} 
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    );
    
};


export default AirportLocationsList;