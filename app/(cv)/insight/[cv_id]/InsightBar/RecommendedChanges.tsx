"use client"
import React, { useState } from "react";
import OpenArrow from "@/public/assets/cv/insight/OpenArrow_icon";

type RecommendedChangesProps = {
    recommendedChangesList: string,
    // prompt: string
}

const RecommendedChanges: React.FC<RecommendedChangesProps> = ({ recommendedChangesList }) => {
    // Split the recommendations into an array
    const recommendationsArray = recommendedChangesList.split('\n');
    
    // State to manage the visibility of additional content for each recommendation
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Function to toggle the visibility of additional content
    const toggleContent = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold text-lg text-primarygray mb-4">
                Recommendations
            </h2>
            <div>
                {/* Display prompt */}
                {recommendationsArray.map((recommendation, index) => (
                    recommendation.trim() ? (
                        <div key={index} className=" border-2 border-secondarygray bg-white rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleContent(index)}>
                                <h3 className="mb-2 font-bold">
                                    {recommendation.split(':')[0]} {/* Display only the title */}
                                </h3>
                                <OpenArrow flipDegree={expandedIndex === index ? 180 : 0} />
                            </div>
                            {/* Display additional content if expanded */}
                            {expandedIndex === index && (
                                <div>
                                    {/* Display content after the title */}
                                    {recommendation.split(':')[1]}
                                </div>
                            )}
                        </div>
                    ) : null
                ))}
            </div>
        </div>
    )
}

export default RecommendedChanges;