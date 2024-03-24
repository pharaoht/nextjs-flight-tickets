import { CABINSELECTIONS, CABIN } from '@/constants';
import { FormControl, InputLabel, MenuItem, Select, } from '@mui/material';


interface CabinSelectionProps {
    handleChange: (key: string, value: string) => void;
    inputValue: string;
}

const CabinSelection = ({ handleChange, inputValue }: CabinSelectionProps) => (

    <FormControl sx={{ minWidth: 120, background:'white' }} variant='filled' size='small'>
    
        <InputLabel id='CabinClassInput'>Cabin Class</InputLabel>

        <Select
            labelId='CabinClassLabel'
            id='CabinClass'
            value={inputValue}
            label='Cabin Class'
            onChange={(event) => handleChange(CABIN, event.target.value as string)}
        >
            {
                CABINSELECTIONS.map((itm) => {
                    return (
                        <MenuItem key={itm.name} value={itm.value}>{itm.name}</MenuItem>
                    )
                })
            }
        </Select>
    </FormControl>
)


export default CabinSelection;