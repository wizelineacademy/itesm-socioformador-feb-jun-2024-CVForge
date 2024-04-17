"use client";
import { setCurrentTab } from "@/contexts/cv/sidebar/currentTab";
import React from "react";
import { useDispatch } from "react-redux";

const Menu: React.FC = ({ }) => {
    // Set the current tab context
    const dispatch = useDispatch()
    dispatch(setCurrentTab("cv_gallery"))

    return (
        <>
            cv_gallery
        </>
    )
}

export default Menu;

