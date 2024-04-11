"use client";
import React from "react";
import Useroptions from "./Useroptions/components/Useroptions";
import Login from "./login/components/Login";

import '../../style/globals.css'
import Signin from "./signin/components/Signin";


const Auth: React.FC = ({ }) => {
    return (
        <main className="w-full h-full">
        <Signin/>
        </main>
    )
}

export default Auth;