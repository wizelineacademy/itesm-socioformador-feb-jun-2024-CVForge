"use client"
import "@/style/globals.css"
import React from "react"

// Component imports
import Register from "./components/Register"

const Auth: React.FC = ({}) => {
  return (
    <main className="w-full h-full">
      <Register />
    </main>
  )
}

export default Auth
