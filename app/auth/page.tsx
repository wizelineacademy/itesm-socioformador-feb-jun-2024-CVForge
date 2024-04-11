"use client";
import React from "react";
import Login from "./login/components/Login";
import Useroptions from "./Useroptions/components/Useroptions";

import '../../style/globals.css'


const Auth: React.FC = ({ }) => {
    return (
        <main className="w-full h-full">
        <Login />
      </main>
    )
}

export default Auth;