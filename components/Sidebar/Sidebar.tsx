import React, { useContext, useEffect, useState } from 'react'
import TimeSlider from '../TimeSlider/TimeSlider';
import useURLParams from '@/hooks/useUrlParams';
import { ONEWAY, DEPARTOUTBOUNDTIMEFROM, DEPARTOUTBOUNDTIMETO, DIRECTION, DEPARTARRIVEFROM, DEPARTARRIVETO, RETURNARRIVEFROM, RETURNOUTBOUNDTIMEFROM, RETURNOUTBOUNDTIMETO, RETURNARRIVETO, TOTALDURATION, DEPARTURE, RETURN } from '@/constants';
import Duration from '../Duration/Duration';
import FlightContext from '@/context/flightState';

const Sidebar = () => {

  const { setMultipleUrlParams, getUrlParamsValue, setUrlParams } = useURLParams();

  const isReturn = getUrlParamsValue(DIRECTION);

  const flightContext = useContext(FlightContext);
  
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

  const [ isFromUserInput, setIsFromUserInput ] = useState<boolean>(false);

  useEffect(() => {
      setMultipleUrlParams(flightTimes);
  }, [flightTimes]);

  useEffect(() => {
    setUrlParams(TOTALDURATION, duration)
  }, [duration])

  useEffect(() => {

  if (isFromUserInput && flightContext) {

    flightContext.filterDuration?.(duration) || (() => {});
    setIsFromUserInput(false);
  }

  }, [isFromUserInput]);


  return (
    <div>
        <Duration 
          setUserInput={setIsFromUserInput}
          setDuration={setDuration}
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