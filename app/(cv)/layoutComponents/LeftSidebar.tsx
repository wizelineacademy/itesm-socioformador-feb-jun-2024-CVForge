"use client";

// Default imports
import { useDispatch, useSelector } from "react-redux"
import { BsArrowLeftShort } from 'react-icons/bs';


// Icon imports
import SecondaryLogo from "@/public/assets/SecondaryLogo"
import CV_icon from "@/public/assets/cv/CV_icon"
import PersonalInfo_icon from "@/public/assets/cv/PersonalInfo_icon"
import { RootState } from "@/contexts/cv/RootState"
import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

type SidebarListElementProps = {
    title: string;
    currentTab: string; // Current tab value
    itemTab: string; // To check if it is the same as the current tab
    href: string; // Link to redirect
    icon: ReactElement;
};

const SidebarListElement: React.FC<SidebarListElementProps> = ({ title, currentTab, href, itemTab, icon }) => {
    // The color to be assigned
    const color = currentTab === itemTab ? "white" : "#7E7E7E";

    // The icon for the item
    const IconComponent = React.cloneElement(icon, { strokeColor: color });

    return (
        <li className="my-6">
            <Link href={href} className="flex flex-row items-center">
                <div className="w-10 h-10">
                    {IconComponent}
                </div>
                <p className="ml-2"
                    style={{ color: color }}>
                    {title}
                </p>
            </Link>
        </li>
    );
};

const LeftSidebar = () => {
    // Context that stores the current tab being displayed, to add styling accordingly
    const currentTab = useSelector((state: RootState) => state.currentTab)

    return (
        <aside className="flex">
            <div className="flex h-screen w-72 bg-aiblue text-white p-5 pt-8">

            </div>
        </aside>
    )
}

export default LeftSidebar;