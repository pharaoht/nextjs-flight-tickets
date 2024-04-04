import React, { useState } from 'react';
import styles from './duration.module.css';
import Stack from '@mui/material/Stack/Stack';
import RangeSlider from '../RangeSlider/RangeSlider';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const MINDISTANCE = 1;

const Duration = () => {

    const [ isHidden, setIsHidden ] = useState(true);

    const [ durationSlider, setDurationSlider ] = useState<number[]>([0,12])

    const toggleHandler = () => setIsHidden( prevState => !prevState);

    const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) return;
        
        if (activeThumb === 0) {
            setDurationSlider([Math.min(newValue[0], durationSlider[1] - MINDISTANCE), durationSlider[1]]);
        }
        else {
            setDurationSlider([durationSlider[0], Math.max(newValue[1], durationSlider[0] + MINDISTANCE)]);
        }
    };

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