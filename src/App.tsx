import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Privacy } from "./Privacy";
import { Terms } from "./Terms";
import { Home } from "./Home";
import { Forgot } from "./Forgot";
import { Login } from "./Login";
import { UserProvider } from "./UserContext";
import "./App.css";


const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path="/forgot"><Forgot /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/privacy"><Privacy /></Route>
          <Route path="/terms"><Terms /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}
export default App;

