import '../styles/global.css';

import '@fontsource/poppins';
import '@fontsource/merriweather'

import { ThemeProvider } from '@mui/material';
import { theme } from '../theme/theme.config.js';
import CssBaseline from '@mui/material/CssBaseline';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;


