import { TextField } from '@mui/material';

interface PassengerProps {
    label: string;
    id:string;
    value:string;
    className:string;
    inputProps?:{};
    handleChange: (key: string, value: string) => void;
    paramName: string;
}

const PassengerField = ({ label, id, value, className, inputProps, handleChange, paramName}: PassengerProps) => {
    return (
        <TextField
            label={label}
            id={id}
            className={className}
            inputProps={inputProps}
            value={value}
            onChange={(event) => handleChange(paramName, event.target.value as string)}
            variant='filled'
            size='small'
            type='number'
        />
    )
};

export default PassengerField;