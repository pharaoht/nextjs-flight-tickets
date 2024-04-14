import { DIRECTION } from "@/constants";
import { PRIMARY, SECONDARY } from "@/theme/theme";
import Button from "@mui/material/Button/Button";
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup";

const ONEWAY = 'oneWay';
const RETURNFLIGHT = 'return';

interface DestinationBtnProps {
    selectedOption: string;
    handleParamChange: (paramName:string, value:string, event?: any) => void;
    customCss?: string;
}

const DestinationButtonGroup = ({ selectedOption, handleParamChange, customCss} : DestinationBtnProps) => (

    <ButtonGroup variant="contained" className={customCss}>
        <Button
            color={selectedOption === ONEWAY ? PRIMARY : SECONDARY}
            onClick={() => handleParamChange(DIRECTION, ONEWAY)}
        >
            One-way
        </Button>
        <Button
            color={selectedOption === RETURNFLIGHT ? PRIMARY : SECONDARY}
            onClick={() => handleParamChange(DIRECTION, RETURNFLIGHT)}
        >
            Return
        </Button>
    </ButtonGroup>
)


export default DestinationButtonGroup;