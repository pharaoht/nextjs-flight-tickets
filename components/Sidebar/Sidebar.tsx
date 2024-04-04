import React from 'react'
import TimeSlider from '../TimeSlider/TimeSlider';

const Sidebar = () => {
  return (
    <div>
        <TimeSlider title='Departure Flight' />
        <TimeSlider title='Return Flight' />
    </div>
  )
}

export default Sidebar;