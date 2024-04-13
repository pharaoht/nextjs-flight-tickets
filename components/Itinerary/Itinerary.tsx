import React from 'react';
import styles from './infoFlight.module.css';

interface ItineraryProps {
    flightData: any;
}

const Itinerary = ({ flightData }: ItineraryProps) => {

  const listItemCssClassName = (index: number) => index == 1 ? styles.activeListItem : styles.defaultListItem
  
  const renderStops = ( stops: any[]) => (
    <ul className={styles.listContainer}>
      {
        stops.map((itm, idx)=>(
          <li key={idx} className={`${styles.listItem} ${listItemCssClassName(idx)}`}>{`${flightData.cityFrom} - ${flightData.cityTo}`}</li>
        ))
      }
    </ul>
  )
  
  return (
    <>
        <h2>Journey Preview</h2>
        <div className={styles.headerContainer}>
            <h3>{flightData.cityFrom} - {flightData.countryFrom}</h3>
            <h3>{flightData.cityTo} - {flightData.countryTo}</h3>
        </div>
        <div>
          {
            renderStops([1,1,])
          }
        </div>
    </>
  )
}

export default Itinerary;