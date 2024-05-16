"use client"

// Package imports
import { useState } from "react";

// Icon imports
import OpenArrow from "@/public/assets/cv/insight/OpenArrow_icon";
import { recommendation } from "@prisma/client";

type RecommendationProps = {
    title: string;
    mainContent: string;
}
const Recommendation: React.FC<RecommendationProps> = ({ title, mainContent }) => {
    // Collapsed and only displaying title or displaying the full information
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpenButtonClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="border-2 border-secondarygray rounded-lg p-2 my-2">
            <div className="flex justify-between items-center">
                <h3 className="font-bold">
                    {title}
                </h3>
                <button onClick={handleOpenButtonClick} >
                    <OpenArrow flipDegree={isOpen ? 180 : 0} />
                </button>
            </div>
            {isOpen ?
                <>
                    <hr className="w-full h-[1px] my-1"></hr>
                    <p>{mainContent}</p>
                </>
                : null
            }
        </div>
    )
}

type RecommendationSectionProps = {
    recommendations: recommendation[]
}
const ReccomendationSection: React.FC<RecommendationSectionProps> = ({ recommendations }) => {
    return (
        <div className="min-w-[350px] 2xl:min-w-[500px]">
            <h2 className="font-bold text-lg">
                Recommendations
            </h2>
            {
                recommendations.map((recommendation) =>
                    <Recommendation key={recommendation.recommendation_id} title={recommendation.title} mainContent={recommendation.main_content} />
                )
            }
        </div>
    )

}

export default ReccomendationSection