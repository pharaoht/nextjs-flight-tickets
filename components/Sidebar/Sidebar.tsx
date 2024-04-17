import React, { useEffect, useState, useRef } from 'react'
import TimeSlider from '../TimeSlider/TimeSlider';
import useURLParams from '@/hooks/useUrlParams';
import { ONEWAY, DEPARTOUTBOUNDTIMEFROM, DEPARTOUTBOUNDTIMETO, DIRECTION, DEPARTARRIVEFROM, DEPARTARRIVETO, RETURNARRIVEFROM, RETURNOUTBOUNDTIMEFROM, RETURNOUTBOUNDTIMETO, RETURNARRIVETO, TOTALDURATION, DEPARTURE, RETURN } from '@/constants';
import Duration from '../Duration/Duration';

const Sidebar = () => {

  const { setMultipleUrlParams, getUrlParamsValue, setUrlParams } = useURLParams();

  const isReturn = getUrlParamsValue(DIRECTION);
  const departureParam = getUrlParamsValue(DEPARTURE);
  const returnParam = getUrlParamsValue(RETURN);
  
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

  const [ duration, setDuration ] = useState<string>('');

  useEffect(() => {
      setMultipleUrlParams(flightTimes);
  }, [flightTimes])


  return (
    <div>
        <Duration 
          setDuration={setDuration}
          departDate={departureParam}
          returnDate={returnParam}
        />
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