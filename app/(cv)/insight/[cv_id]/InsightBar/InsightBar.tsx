"use client";

// !REMOVE ONCE THE SERVICES ARE READY
import { SCORE, RECOMMENDATIONS, RECOMMENDED_CHANGES, FETCHED_RECOMMENDATIONS, MOCK_CV } from "../CONSTANTS"

// Package imports
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

// Component imports
import ReccomendationSection from "./RecommendationSection";

// Icon imports
import OpenArrow from "@/public/assets/cv/insight/OpenArrow_icon";
import RecommendedChanges from "./RecommendedChanges";

type LoadingSpinnerProps = {}
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ }) => {
    return (
        <div
            className="inline-block h-8 w-8 animate-spin rounded-full 
      border-4 border-solid border-current border-r-transparent 
      align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]
       text-orange-600"
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>
    );
}

const InsightBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [aiResponse, setAiResponse] = useState<string>("");
    const [isLoadingFetch, setIsLoadingFetch] = useState<boolean | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleOpenInsightBar = () => {
        setIsOpen(!isOpen);
    }

    const toggleContent = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    useEffect(() => {
        const handleCheckService = async () => {
            setIsLoadingFetch(true);
            try {
                const response = await fetch('/api/py', { method: 'GET' });
                const jsonData = await response.json();
                const message = jsonData.message;
                setAiResponse(message);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setIsLoadingFetch(false);
            }
        };

        handleCheckService();
    }, []);

    return (
        <div className={` ${isOpen ? "w-[900px]" : "w-[400px] 2xl:w-[600px]"} h-full transition-all duration-500 right-0 shadow-lg font-inter bg-white text-primarygray`}>
            <div className="w-full h-screen px-4 overflow-y-auto">
                <div className="w-full flex flex-row items-center mt-8 mb-2">
                    <button onClick={handleOpenInsightBar}>
                        <OpenArrow flipDegree={isOpen ? 90 : 270} />
                    </button>
                    <h1 className="text-3xl font-black">Score</h1>
                </div>
                <hr className="w-full h-[1px]"></hr>
                <div className={`${isOpen ? "flex-row" : "flex-col"} flex`}>
                    <div>
                        <div className="flex justify-center my-4">
                            <Gauge
                                width={150}
                                height={150}
                                value={SCORE}
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                        fontSize: 50,
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
                    </div>
                    {isLoadingFetch ?
                        <LoadingSpinner />
                        :
                        <RecommendedChanges recommendedChangesList={aiResponse} />
                    }
                </div>
                <div className="w-full bottom-0 right-0 flex justify-end items-center">
                    <Link href={"/roadmap/945f1b8a-3502-49f5-b181-ccd212a10b89"} className="h-full text-end pr-4">Roadmap</Link>
                </div>
            </div>
        </div>
    )
}

export default InsightBar;