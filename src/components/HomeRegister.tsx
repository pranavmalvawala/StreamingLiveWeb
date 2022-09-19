import * as React from "react";
import { ErrorMessages } from "./";
import { Register } from "../appBase/pageComponents/components/Register";
import ReactGA from "react-ga";
import { EnvironmentHelper, UserInterface } from "../helpers";
import { Container, Box, Typography, Grid } from "@mui/material";

export function HomeRegister() {
  const [customErrors, setCustomErrors] = React.useState<string[]>([]);

  const trackUserRegister = async (user: UserInterface) => {
    if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.event({ category: "User", action: "Register" });
  }

  return (
    <div id="register">
      <Container fixed>
        <Box sx={{ textAlign: "center" }}>
          <Typography component="h2" sx={{ fontSize: "32px", fontWeight: 700, lineHeight: 1.2, marginBottom: "20px" }}>Register <span>Your Church</span></Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <p style={{ marginTop: 0 }}>This is a <b><u>completely free</u></b> service offered to churches by <a href="https://livecs.org/">Live Church Solutions</a>, a 501(c)(3) organization with EIN 45-5349618, that was founded in 2012 with the goal of helping small churches with their technical needs.</p>
            <p>If you would like to help support our mission of enabling churches to thrive with technology solutions, please consider <a href="https://livecs.org/partner/">partnering with us</a>.</p>
          </Grid>
          <Grid item md={6}>
            <ErrorMessages errors={customErrors} />
            <div id="registerBox">
              <Register
                updateErrors={setCustomErrors}
                appName="StreamingLive"
                appUrl={window.location.protocol + "//" + window.location.host}
                userRegisteredCallback={trackUserRegister}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
