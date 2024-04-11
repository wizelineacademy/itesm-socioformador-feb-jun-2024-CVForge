"use client";
import '@/style/globals.css'
import React from "react";

// Component imports
import Login from "./components/Login";

const Auth: React.FC = ({ }) => {
    return (
        <main className="w-full h-full">
            <Login />
        </main>
    )
}

export default Auth;