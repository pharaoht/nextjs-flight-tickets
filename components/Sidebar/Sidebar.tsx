import React from 'react'
import TimeSlider from '../TimeSlider/TimeSlider';
import useURLParams from '@/hooks/useUrlParams';
import { ONEWAY, DIRECTION } from '@/constants';
import Duration from '../Duration/Duration';

const Sidebar = () => {

  const { getUrlParamsValue } = useURLParams();

  const isReturn = getUrlParamsValue(DIRECTION);

  return (
    <div>
        <Duration />
        <TimeSlider title='Depart Flight' />
        { (isReturn !== ONEWAY ) &&
          <TimeSlider title='Return Flight' />
        }
    </div>
  )
}

export default Sidebar;