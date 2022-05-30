import React from 'react';
import AppRoutes from "./components/AppRoutes";

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                fontFamily: "Rockwell",
            },
        },
    },
    palette: {
        primary: {
            light: '#757ce8',
            main: '#000',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },

});

function App() {
  return (
      <ThemeProvider theme={theme}>
          <div className="App">
            <AppRoutes />
          </div>
      </ThemeProvider>
  );
}

export default App;
