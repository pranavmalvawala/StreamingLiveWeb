import React from "react";
import { Link } from "react-router-dom";
export const HomeHero: React.FC = () => (
  <div id="hero">
    <div className="container">
      <div className="row">
        <div className="col-6">
          <a href="/"><img src="/images/logo-home.png" alt="Streaming Live" /></a>
        </div>
        <div className="col-6 text-right">
          <a href="#register" className="btn btn-info btn-sm">Register</a> &nbsp;
          <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
        </div>
      </div>
      <div className="text-center">
        <h1>Connecting the Church</h1>
        <p>Even While We're Apart</p>
        <a href="#register" className="btn btn-info btn-lg">Get Started Now</a>
      </div>
    </div>
  </div>
)
