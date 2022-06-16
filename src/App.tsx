import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Routing } from "./Routing";
import { UserProvider } from "./UserContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Themes } from "./appBase/helpers";

const App: React.FC = () => (
  <UserProvider>
    <CookiesProvider>
      <ThemeProvider theme={Themes.BaseTheme}>
        <CssBaseline />
        <Router>
          <Routing />
        </Router>
      </ThemeProvider>
    </CookiesProvider>
  </UserProvider>
)
export default App;

