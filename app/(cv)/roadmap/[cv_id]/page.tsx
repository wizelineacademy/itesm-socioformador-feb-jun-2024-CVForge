"use client";
import Link from "next/link";
// !DELETE
import { RECOMMENDATIONS } from "../../insight/[cv_id]/CONSTANTS";

// Package imports
import { useState } from "react";

// Icon imports
import OpenArrow_icon from "@/public/assets/cv/insight/OpenArrow_icon";
import { recommendation } from "@prisma/client";

type RoadmapItemProps = {
    title: string;
    mainContent: string;
    isLast: boolean;
    isCompleted: (completed: boolean) => void;
}
const RoadmapItem: React.FC<RoadmapItemProps> = ({ title, mainContent, isLast, isCompleted }) => {
    const [completed, setCompleted] = useState<boolean>(false);
    const handleCompleted = () => {
        setCompleted(!completed)
        isCompleted(!completed)
    }
    return (
        <li className="flex flex-row font-inter">
            <div className="flex flex-col items-center">
                <div className="w-[26px] h-[26px] flex justify-center">
                    <button onClick={handleCompleted}
                        className="w-[26px] h-[26px] border border-1 border-secondarygray rounded-full flex justify-center items-center">
                        <span className={`w-[20px] h-[20px] rounded-full ${completed ? "bg-gptgreen" : "bg-white"}`}></span>
                    </button>
                </div>
                <div className={`${isLast ? "hidden" : "w-[1px] h-full bg-secondarygray"}`}></div>
            </div>
            <div className={`flex flex-col mb-6 ml-4`}>
                <h3 className="font-semibold text-2xl">{title}</h3>
                <p className="text-secondarygray text-lg">{mainContent}</p>
            </div>
        </li>
    )
}

const Roadmap: React.FC = () => {
    return (
        <div className="w-full min-h-screen font-inter text-primarygray bg-bg">
            <Link href={"/"}
                className="sticky top-0 w-full h-10 flex items-center text-secondarygray bg-bg">
                <OpenArrow_icon flipDegree={270} />
                Back to Menu
            </Link>


            {/* Roadmap description */}
            <div className="w-full h-full flex flex-col text-center mt-4">
                <h1 className="font-black text-3xl">
                    Roadmap
                </h1>
                <p className="text-secondarygray self-center w-1/2 text-xl mt-4">This roadmap delineates recommended challenges suggested by our AI to enhance your qualifications and increase your likelihood of securing your desired position.</p>
            </div>
            {/* Roadmap points */}
            <ul className="mt-10">
                {
                    RECOMMENDATIONS.map((recommendation, index) => (
                        <RoadmapItem key={crypto.randomUUID()}
                            title={recommendation.title}
                            mainContent={recommendation.mainContent}
                            isLast={index === RECOMMENDATIONS.length - 1}
                            isCompleted={() => console.log()}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default Roadmap;