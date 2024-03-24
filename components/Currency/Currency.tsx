import { CURRENCIES, CURRENCY } from '@/constants'
import MenuItem from '@mui/material/MenuItem/MenuItem'
import { FormControl, InputLabel, Select } from '@mui/material';

interface CurrencySelectionProps {
    handleChange: (key: string, value: string) => void;
    inputValue: string;
}

const CurrencySelection = ({handleChange, inputValue}: CurrencySelectionProps) => {

    return (
        <FormControl sx={{ minWidth: 120, background:'white' }} variant='filled' size='small'>

            <InputLabel id='CabinClassInput'>Currency</InputLabel>

            <Select
                labelId='CurrencyLabel'
                id='Currency'
                value={inputValue}
                label='Currency'
                onChange={(event) => handleChange(CURRENCY, event.target.value as string)}
            >
              {
                CURRENCIES.map((itm) => {
                  return (
                    <MenuItem key={itm.value} value={itm.value}>
                      {itm.label}
                    </MenuItem>
                  )
                })
              }
            </Select>
        </FormControl>
    )
}

export default CurrencySelection;