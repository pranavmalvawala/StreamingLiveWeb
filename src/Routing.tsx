import React from "react";
import "./App.css";
import { Home } from "./Home";
import { Privacy } from "./Privacy";
import { Terms } from "./Terms";
import { Switch, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga";
import { EnvironmentHelper } from "./helpers";
import { Login } from "./Login";
import { Logout } from "./Logout";

export const Routing: React.FC = () => {
  const location = useLocation();
  if (EnvironmentHelper.GoogleAnalyticsTag !== "") {
    ReactGA.initialize(EnvironmentHelper.GoogleAnalyticsTag);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  React.useEffect(() => { if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.pageview(location.pathname + location.search); }, [location]);

  return (
    <Switch>
      <Route path="/login"><Login /></Route>
      <Route path="/logout"><Logout /></Route>
      <Route path="/privacy"><Privacy /></Route>
      <Route path="/terms"><Terms /></Route>
      <Route path="/"><Home /></Route>
    </Switch>
  );
}
