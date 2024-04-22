"use client"
// Default imports
import "@/style/globals.css";
import {BsArrowLeftShort} from "react-icons/bs"
import {AiFillEnvironment} from "react-icons/ai"


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
  const [open, setOpen] = useState(true);
  return (
    <html className="scroll-smooth" lang="en">
      <ReduxProvider>
        <div className = "flex"> 
          <div className={`bg-primarygray h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} relative`}>
            <BsArrowLeftShort className="bg-gptgreen text-primarygray text-3xl rounded-full absolute -right-3 top-9 border border-primarygray cursor-pointer" onClick={() => setOpen(!open)}></BsArrowLeftShort>
            <div>
              <AiFillEnvironment className="bg-gptgreen text-4xl text-primarygray rounded cursor-pointer block float-left mr-2"></AiFillEnvironment>
              <h1 className="text-whitef origin-left font-medium text-2xl">Tailwind</h1>
            </div>
          </div>
          <div className="p-7">
            <h1 className="text-2xl font-semibold text-primarygray"> Hello </h1>
          </div>
        </div>
      </ReduxProvider>
    </html>
  )
}