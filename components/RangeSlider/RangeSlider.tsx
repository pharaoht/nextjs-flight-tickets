import { Stack } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Slider from '@mui/material/Slider/Slider';

interface RangeSliderProps {
    value: number[];
    handleChange: (event: Event, newValue: number | number[], activeThumb: number) => void;
    leftLabel: string;
    rightLabel:string;
}

const RangeSlider = ({ value, handleChange, leftLabel, rightLabel}: RangeSliderProps) => (
    <Box sx={{ width: '100%' }}>
        <Stack spacing={2} direction='row' alignItems='center'>
            <span>{leftLabel}</span>
            <Slider
                value={value}
                onChange={handleChange}
                min={0}
                max={23}
                disableSwap
            />
            <span>{rightLabel}</span>
        </Stack>
    </Box>
)


export default RangeSlider;