import React from "react";
import { Container, AppBar, Stack } from "@mui/material";

export const Header: React.FC = () => (
  <>
    <AppBar id="navbar" position="fixed">
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <a href="/" className="logo"><img src="/images/logo-nav.png" alt="logo" /></a>
        </Stack>
      </Container>
    </AppBar>
    <div id="navSpacer"></div>
  </>
)
