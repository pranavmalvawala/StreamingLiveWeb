import React from "react";
import { Link } from "react-router-dom";
import { Container, Box, Typography, Button, Stack } from "@mui/material";

export const HomeHero: React.FC = () => (
  <div id="hero">
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <a href="/" className="hero-logo"><img src="/images/logo-home.png" alt="Streaming Live" /></a>
        <Box sx={{whiteSpace: "nowrap"}}>
          <Button href="#register" variant="contained" size="small" disableElevation sx={{"&:focus": { outline: "none", color: "white"}, textTransform: "capitalize", fontSize: "14px", textShadow: "none", marginRight: "10px"}}>Register</Button>
          <Link to="/login">
            <Button variant="contained" size="small" color="success" disableElevation sx={{"&:focus": { outline: "none", color: "white"}, textTransform: "capitalize", fontSize: "14px"}}>Login</Button>
          </Link>
        </Box>
      </Stack>
      <Box sx={{textAlign: "center"}}>
        <Typography component="h1">Connecting the Church</Typography>
        <p>Even While We're Apart</p>
        <Button href="#register" variant="contained" size="large" disableElevation sx={{"&:focus": { outline: "none", color: "white"}, textTransform: "capitalize", fontSize: "20px", textShadow: "none"}}>Get Started Now</Button>
      </Box>
    </Container>
  </div>
)
