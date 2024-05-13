"use client"
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingContent from "./call_to_actions/Landing_Content";
import LandingFeature from "./call_to_actions/Landing_Feature";
import LandingPosition from "./call_to_actions/Landing_Position";
import LandingStart from "./call_to_actions/Landing_Start";


const Home: React.FC = () => {
  return (
    <div>
      <LandingStart/>
      <LandingFeature/>
    </div>
  );
};

export default Home;
/*
<LandingStart/>
<LandingContent/>
        <LandingFeature/>
        <LandingPosition/>
        <Footer />
*/