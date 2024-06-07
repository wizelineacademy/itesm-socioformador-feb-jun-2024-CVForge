"use client"
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingFeature from "./call_to_actions/Landing_Feature";
import LandingPosition from "./call_to_actions/Landing_Position";
import LandingStart from "./call_to_actions/Landing_Start";


const Home: React.FC = () => {
  return (
    <div className="xl:px-48 lg:px-32 md:px-20 sm:px-10 py-16 space-y-32 > * content">
      <div className="pt-20">
        <LandingStart/>
      </div>
      <div className="animation">
        <LandingFeature/>
      </div>
      <LandingPosition/>
    </div>
  );
};

export default Home;
