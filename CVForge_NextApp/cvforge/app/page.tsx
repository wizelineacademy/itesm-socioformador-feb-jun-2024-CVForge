import React from "react";
import Navbar from "./components/Navbar";
import LandingContent from "./Landing/LandingContent";
import LandingFeature from "./Landing/LandingFeature";
import LandingPosition from "./Landing/LandingPosition";
import Footer from "./components/Footer";


const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Navbar />
      <LandingContent />
      <LandingFeature />
      <LandingPosition/>

      <Footer />
    </div>
  );
};

export default Home;
