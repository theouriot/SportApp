import React from 'react';
import AppRoutes from "./components/AppRoutes";

import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: [
            'FreeMono',
            'sans-serif'
        ].join(','),
    }
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
