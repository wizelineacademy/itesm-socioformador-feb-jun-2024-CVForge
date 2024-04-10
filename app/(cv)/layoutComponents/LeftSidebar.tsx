"use client";

// Default imports
import { useDispatch, useSelector } from "react-redux"

// Icon imports
import SecondaryLogo from "@/public/assets/SecondaryLogo"
import CV_icon from "@/public/assets/cv/CV_icon"
import PersonalInfo_icon from "@/public/assets/cv/PersonalInfo_icon"
import { RootState } from "@/contexts/cv/RootState"
import Link from "next/link";

const LeftSidebar = () => {
    const currentTab = useSelector((state: RootState) => state.currentTab)
    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-[#474646] text-white flex flex-col p-10">
            <div className="w-full h-10"><SecondaryLogo /></div>
            <ul>
                <li>
                    <Link href={"/cv_gallery"}
                        className="flex flex-row items-center">
                        <div className="w-10 h-10">
                            <CV_icon />
                        </div>
                        <p className="ml-2">CVs</p>
                    </Link>
                </li>
                <li className="flex flex-row items-center">
                    <Link href={"/info"}
                        className="flex flex-row items-center">
                        <div className="w-10 h-10">
                            <PersonalInfo_icon />
                        </div>
                        <p className="ml-2">Information Editor</p>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default LeftSidebar;