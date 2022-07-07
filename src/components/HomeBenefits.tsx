import React from "react";
import { Container, Box, Typography, Grid, Divider } from "@mui/material";

export const HomeBenefits: React.FC = () => (
  <div id="benefits">
    <Container fixed>
      <Box sx={{textAlign: "center"}}>
        <Typography component="h2" sx={{fontSize: "32px", fontWeight: 700, lineHeight: 1.2, marginBottom: "8px"}}>How <span>Streaming Live</span> Can Help Your Church</Typography>
        <p style={{ marginTop: 20 }} className="lead">During this time when many churches cannot meet physically, connection is more important than ever.  It's not enough to simply offer your service via video.  Members need a way to connect with each other and feel the support of the congregation.</p>
      </Box>
      <Divider sx={{margin: "30px 0"}} />
      <Grid container spacing={3}>
        <Grid item md={6}>
          <p style={{marginTop: 0}}>By live streaming your church service at set times, you can still engage with your members as well as providing a time to connect with one another via chat and prayer requests.</p>
          <p><a href="/">StreamingLive.church</a> is a wrapper to go around your live or prerecorded videos on YouTube, Vimeo, Facebook, or other platforms.  It provides helpful tools such as chat, prayer, sermon outlines, links to key resources, as well as providing an easy means of scheduling your services.</p>
          <p>The appearance of your platform is fully customizable and the service is completely free.</p>
        </Grid>
        <Grid item md={6} sx={{textAlign: "center", margin: "0 auto"}}>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/HC0B3hHdRew" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen frameBorder="0" title="iframe"></iframe>
        </Grid>
      </Grid>
    </Container>
  </div>
)
