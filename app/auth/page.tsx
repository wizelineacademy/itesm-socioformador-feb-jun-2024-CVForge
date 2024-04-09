"use client";
import React from "react";
import Login from "./login/components/Login";
import '../../style/globals.css'

const auth: React.FC = ({ }) => {
    return (
        <main className="w-full h-full">
        <Login />
      </main>
    )
}

export default auth;