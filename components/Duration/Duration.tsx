import React, { useState, useContext, useEffect } from 'react';
import styles from './duration.module.css';
import Stack from '@mui/material/Stack/Stack';
import RangeSlider from '../RangeSlider/RangeSlider';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FlightContext from '@/context/flightState';


interface DurationProps {
    setUserInput: React.Dispatch<React.SetStateAction<boolean>>;
    setDuration: React.Dispatch<React.SetStateAction<string>>;
}

const MINDISTANCE = 1;

const Duration = ({ setDuration, setUserInput }: DurationProps ) => {

    const flightContext = useContext(FlightContext);

    const flightData = flightContext?.flightData || [];

    const [ isHidden, setIsHidden ] = useState<boolean>(true);


    const [ min, setMin ] = useState<number>(0);
    const [ max, setMax ] = useState<number>(0);


    const [ durationSlider, setDurationSlider ] = useState<number[]>([0,0]);

    const toggleHandler = () => setIsHidden( prevState => !prevState);

    const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
  
        if (!Array.isArray(newValue)) return;
        
        if (activeThumb === 0) {
            setDurationSlider([Math.min(newValue[0], durationSlider[1] - MINDISTANCE), durationSlider[1]]);
        }
        else {
            setDurationSlider([durationSlider[0], Math.max(newValue[1], durationSlider[0] + MINDISTANCE)]);
        }

        setUserInput(true);

    };

    const getDurations = ( ) => {

        let lowest = 0;
        let highest = 0;

        for(const item of flightData){

            if(lowest == 0) lowest = Number(item.totalDuration);
            if(highest == 0) highest = Number(item.totalDuration);
            if(item.totalDuration < lowest) lowest = Number(item.totalDuration);
            if(item.totalDuration > highest) highest = Number(item.totalDuration);
            
        }
        setMin(lowest);
        setMax(highest);
        setDurationSlider([Number(lowest), Number(highest)])

    }

    useEffect(() => {

        getDurations();

    }, [ flightData ]);

    useEffect(() => {

        setDuration(`${durationSlider[0]} - ${durationSlider[1]}`)
    }, [ durationSlider ]);


    return (
        <div className={styles.parent}>
            <div className={styles.header}>
                <div>
                    <h3 className={styles.title}>Duration</h3>
                </div>
                <div className={styles.iconHolder}>
                    { isHidden &&
                        <Stack direction='row'>
                            <ScheduleIcon style={{ fontSize: 14, marginRight: '2px'}}/>
                            <span>
                                {`${durationSlider[0]}hrs - ${durationSlider[1]}hrs`}
                            </span>
                        </Stack>
                    }
                </div>
                <div className={styles.iconHolder}>
                    { isHidden ? 
                        <span onClick={toggleHandler}><ExpandMoreIcon/></span>
                    : 
                        <span onClick={toggleHandler}><ExpandLessIcon/></span>
                    }
                </div>
            </div>
            { !isHidden &&
                <div className={styles.sliderHolder}>
                    <RangeSlider 
                        value={durationSlider}
                        min={min}
                        max={max}
                        handleChange={handleSliderChange}
                        leftLabel={`${durationSlider[0]}hrs`}
                        rightLabel={`${durationSlider[1]}hrs`}
                    />
                </div>
            }
        </div>
    )
}

export default Duration;