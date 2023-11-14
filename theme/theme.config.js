import { createTheme } from '@mui/material';

export const themeOptions = {
  palette: {
    primary: {
      main: '#0a3269',
    },
    secondary: {
      main: '#c77309',
    },
    tertiary: {
      main: '#882796'
    },
    fourth: {
      main: '#000080'
    },
    background: {
      default: '#000000',
      paper: '#aa6e39',
    },
    type: 'dark',
    text: {
      primary: '#FFFFF7',
      secondary: 'rgba(37,16,16,0.7)',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    h1: {
      fontFamily: 'Merriweather',
    },
    h2: {
      fontFamily: 'Merriweather',
    },
    h3: {
      fontFamily: 'Merriweather',
    },
    h4: {
      fontFamily: 'Merriweather',
    },
    h5: {
      fontFamily: 'Merriweather',
    },
    h6: {
      fontFamily: 'Merriweather',
    },
    body2: {
      fontSize: '1.5rem'
    }
  },
  breakpoints: {
    values: {
      sm: 300,
      md: 750,
      lg: 1087,
      xl: 1536,
    },
  },
};

const theme = createTheme(themeOptions);

export { theme }