"use client";

// Default imports
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";



// Icon imports
import { useRouter } from 'next/navigation';
import SecondaryLogo from "@/public/assets/SecondaryLogo"
import CV_icon from "@/public/assets/svg/CV_icon"
import PersonalInfo_icon from "@/public/assets/svg/PersonalInfo_icon"
import SignOut from "@/public/assets/svg/SignOut_Icon"
import Account from "@/public/assets/svg/Account_Icon"
import { RootState } from "@/contexts/cv/RootState"
import Link from "next/link";
import React, { ReactElement, ReactNode, use, useEffect } from "react";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useWindowSize } from "@/hooks/useWindowSize";
import GalleryLoading from "@/app/components/loading";



type SidebarListElementProps = {
    title: string;
    currentTab: string; // Current tab value
    itemTab: string; // To check if it is the same as the current tab
    href: string; // Link to redirect
    icon: ReactElement;
    open: boolean;
};

const SidebarMenuElement: React.FC<SidebarListElementProps> = ({ title, currentTab, href, itemTab, icon, open}) => {
    // The color to be assigned
    const color = currentTab === itemTab ? "#D9D9D9" : "#7E7E7E";
    // The icon for the item
    const IconComponent = React.cloneElement(icon, { strokeColor: color });

    return (
        <li className="my-6">
            <Link href={href} className= {`flex flex-row items-center ${!open && "hidden"} hover:bg-secondarygray hover:rounded hover:bg-opacity-30 p-1.5`} style={{ color: color }}>
                <div className="flex cursor-pointer items-center">
                    <div className="mr-1 flex flex-row items-center w-8 ">
                        <div className="w-8 h-8 text-4xl ">
                            {IconComponent}
                        </div>
                    </div>
                    <p className= "ml-2 origin-left font-medium font-inter text-xl font-bold" style={{ color: color }}>
                        {title}
                     </p>
                </div>
            </Link>
        </li>
    );
};

const SidebarSettingsElement: React.FC<SidebarListElementProps> = ({ title, icon, open}) => {
    // The color to be assigned
    const color = "#7E7E7E";
    // The icon for the item
    const IconComponent = React.cloneElement(icon, { strokeColor: color });

    return (
        <button className="my-4" onClick={() => signOut({callbackUrl: "/", redirect: true})}>
            <div className= {`flex flex-row items-center ${!open && "hidden"} hover:bg-secondarygray hover:rounded hover:bg-opacity-30 p-1.5 pr-16`} style={{ color: color }}>
                <div className="flex cursor-pointer items-center">
                    <div className="mr-1 flex flex-row items-center w-8 ">
                        <div className="w-8 h-8 text-4xl ">
                            {IconComponent}
                        </div>
                    </div>
                    <p className= "ml-2 origin-left font-medium font-inter text-lg " style={{ color: color }}>
                        {title}
                     </p>
                </div>
            </div>
        </button>
    );
};

const LeftSidebar = () => {
    // Context that stores the current tab being displayed, to add styling accordingly
    const currentTab = useSelector((state: RootState) => state.currentTab)
    const [open, setOpen] = useState(true);
    const windowSize = useWindowSize();
    const router = useRouter();
    const { data: session, status } = useSession(); 

    useEffect(() => {
 

        if (status === 'unauthenticated' || !session) {
            router.push('/login');
        }
    }, [status, session, router]);

    useEffect(() => {
        if (windowSize.width < 900){
            setOpen(false)
        }
        if (windowSize.width > 900){
            setOpen(true)
        }
    }, [windowSize])
    if (status === 'loading') {
        return (
            <div className="absolute w-screen h-screen top-0 left-0 bg-white flex justify-center items-center">
                <GalleryLoading />
            </div>
        )
    }
    return (
        <aside className="flex z-10">
            <div className={`bg-primarygray h-screen ${open ? "w-64" : "w-0"} duration-200 relative`}>
                <div className="p-5 h-full">
                    <IoIosArrowForward className={`flex flex-col h-screen items-center justify-center text-primarygray text-3xl absolute -right-7 cursor-pointer hover:text-secondarygray ${open && "rotate-180"}`} 
                        onClick={() => setOpen(!open)}
                    />
                    <div className={`${!open && "hidden"} py-8 `}>
                        <div className="inline-flex">
                            <Link href="/">
                                <div className="w-full h-10"><SecondaryLogo /></div>
                            </Link>
                        </div>
                        <div className="w-full px-2">
                            <div className="pt-3">
                                <ul>
                                    <SidebarMenuElement
                                        title="CVs"
                                        icon={<CV_icon />}
                                        currentTab={currentTab}
                                        href="/cv_gallery"
                                        itemTab="cv_gallery"
                                        open= {open}
                                    />
                                    <SidebarMenuElement
                                        title="Editor"
                                        icon={<PersonalInfo_icon />}
                                        currentTab={currentTab}
                                        href="/editor"
                                        itemTab="editor"
                                        open= {open}
                                    />
                                </ul>
                            </div>
                            <div className="absolute bottom-0 w-48 pb-6">
                                <ul>
                                    <SidebarSettingsElement
                                        title="Account"
                                        icon={<Account />}
                                        currentTab={currentTab}
                                        href=""
                                        itemTab=""
                                        open= {open}
                                    />
                                    <SidebarSettingsElement
                                        title="Sign Out"
                                        icon={<SignOut />}
                                        currentTab={currentTab}
                                        href=""
                                        itemTab=""
                                        open= {open}
                                    />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default LeftSidebar;