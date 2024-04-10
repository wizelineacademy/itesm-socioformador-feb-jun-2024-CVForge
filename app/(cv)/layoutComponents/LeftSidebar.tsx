"use client";

// Default imports
import { useDispatch, useSelector } from "react-redux"

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
                <p className={`ml-2 text-[${color}]`}>
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
        <aside className="fixed top-0 left-0 h-screen w-64 bg-[#474646] text-white flex flex-col p-10">
            <div className="w-full h-10"><SecondaryLogo /></div>
            <div className="mt-6">
                <ul>
                    <SidebarListElement
                        title="CVs"
                        icon={<CV_icon />}
                        currentTab={currentTab}
                        href="/cv_gallery"
                        itemTab="cv_gallery"
                    />
                    <SidebarListElement
                        title="Information Editor"
                        icon={<PersonalInfo_icon />}
                        currentTab={currentTab}
                        href="/info"
                        itemTab="info"
                    />
                </ul>
            </div>
        </aside>
    )
}

export default LeftSidebar;