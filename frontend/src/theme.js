// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#61dafb' },
    background: { default: '#f4f8fb' },
  },
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
    fontWeightBold: 800,
  },
});

export default theme;
