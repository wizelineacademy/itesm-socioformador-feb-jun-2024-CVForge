"use client";

// Default imports
import React from "react";
import { useDispatch, UseDispatch } from "react-redux";

// Context imports
import { setCurrentTab } from "@/contexts/cv/sidebar/currentTab"

const Info: React.FC = ({ }) => {
    // Set the current tab context
    const dispatch = useDispatch()
    dispatch(setCurrentTab("info"))

    return (
        <>
            Info
        </>
    )
}

export default Info;