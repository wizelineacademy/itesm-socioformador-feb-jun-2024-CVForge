"use client"
// Default imports
import "@/style/globals.css";

// Providers
import ReduxProvider from "./ReduxProvider";

// Components
import LeftSidebar from "./layoutComponents/LeftSidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="scroll-smooth" lang="en">
      <ReduxProvider>
        <body className = "flex flex-row w-full h-screen overflow-hidden"> 
          <LeftSidebar></LeftSidebar>
          {children}
        </body>
      </ReduxProvider>
    </html>
  )
}