import { Stack } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Slider from '@mui/material/Slider/Slider';

interface RangeSliderProps {
    value: number[];
    handleChange: (event: Event, newValue: number | number[], activeThumb: number) => void;
    leftLabel: string;
    rightLabel:string;
    min?:number;
    max?:number;
}

const RangeSlider = ({ value, handleChange, leftLabel, rightLabel, min, max}: RangeSliderProps) => (
    <Box sx={{ width: '100%' }}>
        <Stack spacing={2} direction='row' alignItems='center'>
            <span style={{ whiteSpace: 'nowrap' }}>{leftLabel}</span>
            <Slider
                value={value}
                onChange={handleChange}
                min={min ?? 0}
                max={max ?? 24}
                disableSwap
            />
            <span style={{ whiteSpace: 'nowrap' }}>{rightLabel}</span>
        </Stack>
    </Box>
)


export default RangeSlider;