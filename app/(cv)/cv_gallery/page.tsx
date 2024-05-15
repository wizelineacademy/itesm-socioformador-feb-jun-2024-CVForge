"use client";
import { setCurrentTab } from "@/contexts/cv/sidebar/currentTab";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";

const Menu: React.FC = ({ }) => {
  // Set the current tab context
  const dispatch = useDispatch()
  dispatch(setCurrentTab("cv_gallery"))

  useEffect(() => {
    const handleCheckService = async () => {
      try {
        const response = await fetch('/api/createCv', { method: 'POST'});
        const jsonData = await response.json();
        const message = jsonData.results;
        console.log("-----", message);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    handleCheckService();
  }, []);


  return (
    <div className="flex h-screen overflow-y-scroll justify-center">
      <div className="flex flex-col">
        <SearchBar />
        <Gallery />
      </div>
    </div>

  )
}

export default Menu;

