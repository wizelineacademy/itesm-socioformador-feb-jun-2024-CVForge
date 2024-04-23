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
          <body>
            <div className="wrapper">
              <div className = "flex flex-row w-full h-screen overflow-hidden"> 
                <LeftSidebar></LeftSidebar>
                {children}
              </div>
            </div>
          </body>
      </ReduxProvider>
    </html>
  )
}