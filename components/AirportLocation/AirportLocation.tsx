import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField/TextField";


interface AirportLocationProps {
    inputValue: string;
    onInputChange: (...args: any) => void;
    loading: boolean;
    id:string;
    options: any[];
    paramType:string;
    className:string;
    label:string;
};

const AirportLocationField = ({ label, inputValue, onInputChange, options,  id, loading, paramType, className}: AirportLocationProps) => (
    <Autocomplete
        filterOptions={(x) => x }
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => onInputChange(paramType, newInputValue, event)}
        loading={loading}
        id={id}
        getOptionLabel={(option) => option.name} 
        options={options}
        renderInput={(params) => (
            <TextField 
                className={className}
                variant="filled"
                {...params} 
                label={label}
            />
        )}
    />
)

export default AirportLocationField;