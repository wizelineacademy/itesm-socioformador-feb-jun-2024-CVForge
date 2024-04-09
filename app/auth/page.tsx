"use client";
import React from "react";
import '../../style/globals.css'
import Signin from "./signin/components/Signin";

const auth: React.FC = ({ }) => {
    return (
        <main className="w-full h-full">
<Signin/>
      </main>
    )
}

export default auth;