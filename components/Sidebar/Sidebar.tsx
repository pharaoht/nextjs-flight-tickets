import React, { useEffect, useState, useRef } from 'react'
import TimeSlider from '../TimeSlider/TimeSlider';
import useURLParams from '@/hooks/useUrlParams';
import { ONEWAY, DEPARTOUTBOUNDTIMEFROM, DEPARTOUTBOUNDTIMETO, DIRECTION, DEPARTARRIVEFROM, DEPARTARRIVETO, RETURNARRIVEFROM, RETURNOUTBOUNDTIMEFROM, RETURNOUTBOUNDTIMETO, RETURNARRIVETO } from '@/constants';
import Duration from '../Duration/Duration';

const Sidebar = () => {

  const { setMultipleUrlParams, getUrlParamsValue } = useURLParams();

  const isReturn = getUrlParamsValue(DIRECTION);
  
  const [ flightTimes, setFlightTimes ] = useState({
    [DEPARTOUTBOUNDTIMEFROM]: '',
    [DEPARTOUTBOUNDTIMETO]:'',
    [DEPARTARRIVEFROM]:'',
    [DEPARTARRIVETO]:'',
    [RETURNOUTBOUNDTIMEFROM]:'',
    [RETURNOUTBOUNDTIMETO]:'',
    [RETURNARRIVEFROM]:'',
    [RETURNARRIVETO]:'',
  });

  useEffect(() => {
      setMultipleUrlParams(flightTimes);
  }, [flightTimes])

  return (
    <div>
        <Duration />
        <TimeSlider 
          title='Depart Flight' 
          setParamFuncOb={setFlightTimes} 
          obFromParam={DEPARTOUTBOUNDTIMEFROM} 
          obToParam={DEPARTOUTBOUNDTIMETO}
          arrFromParam={DEPARTARRIVEFROM}
          arrToParam={DEPARTARRIVETO}
        />
        { (isReturn !== ONEWAY ) &&
          <TimeSlider 
            title='Return Flight' 
            setParamFuncOb={setFlightTimes} 
            obFromParam={RETURNOUTBOUNDTIMEFROM} 
            obToParam={RETURNOUTBOUNDTIMETO} 
            arrFromParam={RETURNARRIVEFROM}
            arrToParam={RETURNARRIVETO}
          />
        }
    </div>
  )
}

export default Sidebar;