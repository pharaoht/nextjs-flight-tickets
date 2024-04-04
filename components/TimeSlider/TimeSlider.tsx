import React, { useState } from 'react';
import styles from './timeSlider.module.css';
import Stack from '@mui/material/Stack/Stack';
import RangeSlider from '../RangeSlider/RangeSlider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';


const MINDISTANCE = 2;

interface TimeSliderProps {
    title: string;
}

const TimeSlider = ({ title }: TimeSliderProps) => {

    const [ isHidden, setIsHidden ] = useState(true);

    const [ obSliderValue, setObSliderValue ] = useState<number[]>([0, 23]);

    const [ returnSliderValue, setReturnSliderValue ] = useState<number[]>([0, 23]);

    const toggleHandler = () => setIsHidden( prevState => !prevState);

    const obSliderHandleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
            
        if (!Array.isArray(newValue)) return;
        
        if (activeThumb === 0) {
            setObSliderValue([Math.min(newValue[0], obSliderValue[1] - MINDISTANCE), obSliderValue[1]]);
        }
        else {
            setObSliderValue([obSliderValue[0], Math.max(newValue[1], obSliderValue[0] + MINDISTANCE)]);
        }
    }

    const returnSliderHandleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        
        if (!Array.isArray(newValue)) return;
        
        if (activeThumb === 0) {
            setReturnSliderValue([Math.min(newValue[0], returnSliderValue[1] - MINDISTANCE), returnSliderValue[1]]);
        }
        else {
            setReturnSliderValue([returnSliderValue[0], Math.max(newValue[1], returnSliderValue[0] + MINDISTANCE)]);
        }
    }


    return (
        <div className={styles.parent}>
            <div className={styles.header}>
                <div>
                    <h3 className={styles.title}>{title}</h3>
                </div>
                <div className={styles.iconHolder}>
                    { isHidden &&
                        <>
                            <Stack direction='row' >
                                <FlightTakeoffIcon style={{ fontSize: 14, marginRight: '2px' }}/> 
                                <span>
                                    {`${obSliderValue[0]}:00 - ${obSliderValue[1]}:00`}
                                </span>
                            </Stack>
                            <Stack direction='row' >
                                <FlightLandIcon style={{ fontSize: 14, marginRight: '2px' }}/> 
                                <span>
                                    {`${returnSliderValue[0]}:00 - ${returnSliderValue[1]}:00`}
                                </span>
                            </Stack>
                        </>
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
                    <div className={styles.outbound}>
                        <h4 className={styles.title}>Outbound</h4>
                    </div>
                    <div>
                        <RangeSlider 
                            value={obSliderValue} 
                            handleChange={obSliderHandleChange}
                            leftLabel={`${obSliderValue[0]}:00`}
                            rightLabel={`${obSliderValue[1]}:00`}
                        />
                    </div>

                    <div className={styles.outbound}>
                        <h4 className={styles.title} >Arrival</h4>
                    </div>
                    <div>
                        <RangeSlider 
                            value={returnSliderValue} 
                            handleChange={returnSliderHandleChange} 
                            leftLabel={`${returnSliderValue[0]}:00`}
                            rightLabel={`${returnSliderValue[1]}:00`}
                        />
                    </div>
                </div>
            }
        </div >
    )
}

export default TimeSlider;