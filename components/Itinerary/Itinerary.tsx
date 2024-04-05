import React from 'react';

interface ItineraryProps {
    flightData: any;
}

const Itinerary = ({ flightData }: ItineraryProps) => {
  
  return (
    <>
        <h2>Journey Preview</h2>
        <div>
            <h3>{flightData.cityFrom} - {flightData.countryFrom}</h3>
            <h3>{flightData.cityTo} - {flightData.countryTo}</h3>
        </div>
    </>
  )
}

export default Itinerary;