import React, { useEffect, useState } from 'react';
import styles from './timeSlider.module.css';
import Stack from '@mui/material/Stack/Stack';
import RangeSlider from '../RangeSlider/RangeSlider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import useDate from '@/hooks/useDate';


const MINDISTANCE = 2;

interface TimeSliderProps {
    title: string;
    setParamFuncOb: (...args: any) => void;
    obFromParam: string;
    obToParam: string;
    arrFromParam:string;
    arrToParam:string;

}

const TimeSlider = ({ title, setParamFuncOb, obFromParam, obToParam, arrFromParam, arrToParam }: TimeSliderProps) => {

    const [ isHidden, setIsHidden ] = useState(true);

    const [ obSliderValue, setObSliderValue ] = useState<number[]>([0, 24]);

    const [ returnSliderValue, setReturnSliderValue ] = useState<number[]>([0, 24]);

    const { toAmPmformat } = useDate();

    const obStart12hr = toAmPmformat(`${obSliderValue[0]}:00`);
    const obEnd12hr = toAmPmformat(`${obSliderValue[1]}:00`);
    const rtStart12hr = toAmPmformat(`${returnSliderValue[0]}:00`);
    const rtEnd12hr = toAmPmformat(`${returnSliderValue[1]}:00`);

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
    };


    useEffect(() => {

        const timer = setTimeout(() => {

            setParamFuncOb((prevState: any) => ({
                ...prevState,
                [obFromParam]: `${obSliderValue[0]}:00`,
                [obToParam]: `${obSliderValue[1]}:00`,
                [arrFromParam]: `${returnSliderValue[0]}:00`,
                [arrToParam]: `${returnSliderValue[1]}:00`,
            }));

        }, 500);

        return () => clearTimeout(timer)
    
    }, [ obSliderValue, returnSliderValue ])

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
                                <FlightTakeoffIcon style={{ fontSize: 12, marginRight: '2px' }}/> 
                                <span>
                                    {`${obStart12hr}-${obEnd12hr}`}
                                </span>
                            </Stack>
                            <Stack direction='row' >
                                <FlightLandIcon style={{ fontSize: 12, marginRight: '2px' }}/> 
                                <span>
                                    {`${rtStart12hr}-${rtEnd12hr}`}
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
                            leftLabel={obStart12hr}
                            rightLabel={obEnd12hr}
                        />
                    </div>

                    <div className={styles.outbound}>
                        <h4 className={styles.title} >Arrival</h4>
                    </div>
                    <div>
                        <RangeSlider 
                            value={returnSliderValue} 
                            handleChange={returnSliderHandleChange} 
                            leftLabel={rtStart12hr}
                            rightLabel={rtEnd12hr}
                        />
                    </div>
                </div>
            }
        </div >
    )
}

export default TimeSlider;