import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingContent from "./call_to_actions/Landing_Content";
import LandingFeature from "./call_to_actions/Landing_Feature";
import LandingPosition from "./call_to_actions/Landing_Position";
import { getUserSession } from "@/lib/session";


const Home: React.FC = () => {
  const user = getUserSession()
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <main>{JSON.stringify(user)}</main>
      <Navbar />
      <LandingContent/>
      <LandingFeature/>
      <LandingPosition/>
      <Footer />
    </div>
  );
};

export default Home;