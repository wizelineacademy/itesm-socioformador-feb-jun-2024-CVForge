import React from "react";
import Navbar from "./components/Navbar";
import LandingContent from "./components/LandingContent";
import LandingFeature from "./components/LandingFeature";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Navbar />
      <LandingContent />
      <LandingFeature />
    </div>
  );
};

export default Home;
