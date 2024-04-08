import React from "react";
import Navbar from "./components/Navbar";
import Login from "./Login/Login";



const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Login />

    </div>
  );
};

export default Home;
