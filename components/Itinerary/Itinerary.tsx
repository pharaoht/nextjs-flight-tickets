import React, { useState } from 'react';
import styles from './infoFlight.module.css';
import { modalDataSourceProps } from '@/types';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PRIMARY } from '@/theme/theme';

interface ItineraryProps {
    flightData: any;
}

const Itinerary = ({ flightData }: ItineraryProps) => {

  const [ activeTab, setActiveTab ] = useState(0);

  const listItemCssClassName = (index: number) => index == activeTab ? styles.activeListItem : styles.defaultListItem
  
  const renderStops = ( stops: any[]) => (
    <ul className={styles.listContainer}>
      {
        stops.map((itm, idx)=>(
          <li
            key={idx}   
            className={`${styles.listItem} ${listItemCssClassName(idx)}`}
            onClick={() => setActiveTab(idx)}
          >
            {`${itm.airportCodeFrom} - ${itm.airportCodeTo}`}
          </li>
        ))
      }
    </ul>
  )

  const renderFlightData = ( data: modalDataSourceProps ) => (
      <>
          <p>{`${data.cityFrom} (${data.airportCodeFrom})`} - {`${data.cityTo} (${data.airportCodeTo})`}</p>
          <p>
              <span className={styles.singleSpan}>Operator: <b>{data.airline}</b></span>
              <span>Flight Number: <b>{data.flightNum}</b></span>
          </p>
          <p>
              <span className={styles.singleSpan}>Departure: <b>{data.departTime}</b></span> 
              <span>Arrival: <b>{data.arriveTime}</b></span>
          </p>
          <p>
              <span>Duration: <b>{data.duration}</b></span>
          </p>
      </>
  );


  
  return (
    <>
        <h2>Journey Preview</h2>
        <div className={styles.headerContainer}>
            <h3>{flightData.cityFrom}, {flightData.countryFrom}</h3>
            <h3><ArrowForwardIcon /></h3>
            <h3>{flightData.cityTo}, {flightData.countryTo}</h3>
        </div>
        <div className={styles.infoContainer}>
          <h4>Price: ${flightData.price}</h4>
        </div>
        <div>
          {
            renderStops(flightData.modalRouteDataSource)
          }
        </div>
        <div className={styles.flightContainer}>
          {
            renderFlightData(flightData.modalRouteDataSource[activeTab])
          }
        </div>
        <div className={styles.flightContainer}>
          <a href={flightData.link} target="_blank" rel="noopener noreferrer">
            <Button
              color={PRIMARY}
              variant="contained"
              sx={{'height':'3vh'}}
            >
              Book
            </Button>
          </a>
        </div>
        
    </>
  )
}

export default Itinerary;