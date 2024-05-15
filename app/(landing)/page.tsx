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
    <div className="xl:px-48 lg:px-32 md:px-20 sm:px-10 py-10 space-y-32 > *">
      <div className="pt-20">
        <LandingStart/>
      </div>
      <LandingFeature/>
      <LandingPosition/>
    </div>
  );
};

export default Home;
/*
<LandingStart/>
      <LandingFeature/>


<LandingStart/>
<LandingContent/>
        <LandingFeature/>
        <LandingPosition/>
        <Footer />
*/