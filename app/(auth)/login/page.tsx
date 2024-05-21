"use client";
import '@/style/globals.css'
import React from "react";

// Component imports
import Login from "./components/Login";

const Auth: React.FC = ({ }) => {
    return (
        <main className="flex absolute fixed w-full h-full z-10">
            <Login />
        </main>
    )
}

export default Auth;