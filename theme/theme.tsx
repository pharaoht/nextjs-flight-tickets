import { createTheme } from '@mui/material/styles';

export const PRIMARY = 'primary';
export const SECONDARY = 'secondary';
export const ERROR = 'error';


export const theme = createTheme({
  typography: {
    fontFamily: '"Ubuntu", sans-serif',
      button: { textTransform: 'none' },
  },
  palette: {
    primary: {
      main: '#00a698',
    },
    secondary: {
      main: '#555555',
    },
    error:{
      main:'#ff5a26'
    }
  },
});
