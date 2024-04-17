import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ReactNode } from 'react';


interface DialogProps {
    isOpen: boolean;
    handleToggle: (...args: any) => void;
    children: ReactNode
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100vw - 100px)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
'@media (max-width: 600px)': { 
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    textAlign:'center',
    fontSize:'14px'

  },

};


const Dialog = ({ isOpen, handleToggle, children }: DialogProps) => {

    return (
        <Modal
            open={isOpen}
            onClose={handleToggle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={style}>
                {children}
            </Box>
        </Modal>

    )
}

export default Dialog;