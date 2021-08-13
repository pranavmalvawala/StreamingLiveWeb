import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Routing } from "./Routing";
import { UserProvider } from "./UserContext";
import "./App.css";

const App: React.FC = () => (

  <UserProvider>
    <CookiesProvider>
      <Router>
        <Routing />
      </Router>
    </CookiesProvider>
  </UserProvider>
)
export default App;

