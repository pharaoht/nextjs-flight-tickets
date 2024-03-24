
interface AirportLocationProps {
    isAsync: boolean;
    inputValue: string;
    onInputChange: (...args: any) => void;
    loading: boolean;
    id:string;
    getOptionLabel: (...args: any) => void;
    options: [];
};

const AirportLocationField = ({}: AirportLocationProps) => {

};

export default AirportLocationField;