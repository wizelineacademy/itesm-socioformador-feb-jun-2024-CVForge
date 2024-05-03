"use client";
import { setCurrentTab } from "@/contexts/cv/sidebar/currentTab";
import React from "react";
import { useDispatch } from "react-redux";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";

const Menu: React.FC = ({ }) => {
    // Set the current tab context
    const dispatch = useDispatch()
    dispatch(setCurrentTab("cv_gallery"))

    return (
      <div className="flex h-screen overflow-y-scroll justify-center">
        <div className="flex flex-col">
          <SearchBar/>
          <Gallery/>
        </div>
      </div>

    )
}

export default Menu;

