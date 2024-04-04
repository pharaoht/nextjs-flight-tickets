import { Stack } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Slider from '@mui/material/Slider/Slider';

interface RangeSliderProps {
    value: number[];
    handleChange: (event: Event, newValue: number | number[], activeThumb: number) => void;
}

const RangeSlider = ({ value, handleChange}: RangeSliderProps) => (
    <Box sx={{ width: '100%' }}>
        <Stack spacing={2} direction='row' alignItems='center'>
            <span>{value[0]}:00</span>
            <Slider
                value={value}
                onChange={handleChange}
                min={0}
                max={23}
                disableSwap
            />
            <span>{value[1]}:00</span>
        </Stack>
    </Box>
)


export default RangeSlider;