"use client";

// !REMOVE
import { SCORE, RECOMMENDATIONS, RECOMMENDED_CHANGES } from "../CONSTANTS"

// Package imports
import { useState } from 'react';
import Link from 'next/link';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

// Component imports
import ReccomendationSection from "./RecommendationSection";

// Icon imports
import OpenArrow from "@/public/assets/cv/insight/OpenArrow_icon";
import RecommendedChanges from "./RecommendedChanges";

const InsightBar = ({ }) => {
    // Open the inside bar
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpenInsightBar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`
        ${isOpen ? "w-[900px]" : "w-[400px] 2xl:w-[600px]"}
        h-full transition-all duration-500 right-0
        shadow-lg font-inter bg-white text-primarygray`}>
            <div className="w-full h-screen px-4 overflow-y-auto">
                <div className="w-full flex flex-row items-center mt-8 mb-2">
                    <button onClick={handleOpenInsightBar} >
                        <OpenArrow flipDegree={isOpen ? 90 : 270} />
                    </button>

                    <h1 className="text-3xl font-black">Score</h1>
                </div>
                <hr className="w-full h-[1px]"></hr>
                <div className={`${isOpen ? "flex-row" : "flex-col"} flex`}>
                    <div className="">
                        <div className="flex justify-center my-4">
                            <Gauge width={150} height={150} value={SCORE}
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                        fontSize: 60,
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                        fill: '#98C887',
                                        strokeWidth: '4px',
                                        stroke: '#98C887'
                                    },
                                    [`& .${gaugeClasses.referenceArc}`]: {
                                        fill: '#D9D9D9',
                                        strokeWidth: '4px',
                                        stroke: '#D9D9D9'
                                    },
                                })} />
                        </div>

                        <hr className="w-full h-[1px] my-2" />
                        <ReccomendationSection recommendations={RECOMMENDATIONS} />
                        <hr className={`${isOpen ? "hidden" : "visible"} w-full h-[1px] my-2`} />
                    </div>
                    <RecommendedChanges recommendedChangesList={RECOMMENDED_CHANGES} />
                </div>

                <div className="w-full bottom-0 right-0 flex justify-end items-center">
                    <Link href={"/"} className="h-full text-end pr-4">Roadmap</Link>
                </div>
            </div>
        </div>
    )
}

export default InsightBar