import React from 'react';
import AppRoutes from "./components/AppRoutes";

import {createMuiTheme, ThemeProvider} from "@mui/material";

const theme = createMuiTheme({
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
