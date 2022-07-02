import React from "react";
import { FloatingSupport } from "./appBase/components";
import { HomeHero, HomeBenefits, HomeFeatures, HomeRegister } from "./components"

export const Home = () => (
  <>
    <HomeHero />
    <HomeBenefits />
    <HomeFeatures />
    <HomeRegister />
    <FloatingSupport appName="StreamingLive" />
  </>
)
