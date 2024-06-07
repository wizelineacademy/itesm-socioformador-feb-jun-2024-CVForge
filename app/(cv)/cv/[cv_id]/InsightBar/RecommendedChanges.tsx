import React, { useState } from "react";
import OpenArrow from "@/public/assets/cv/insight/OpenArrow_icon";

type Recommendation = {
    recommendation_id: string;
    cv_id: string;
    title: string;
    main_content: string;
    completed: boolean;
};

type RecommendedChangesProps = {
    recommendations: Recommendation[];
};

function removeRecommendationAndStar(inputString: string): string {
    const filteredString = inputString.replace(/Recommendation/g, '').replace(/\*/g, '').replace(/:/g, '');
    return filteredString;
}

const RecommendedChanges: React.FC<RecommendedChangesProps> = ({ recommendations }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleContent = (index: number) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="bg-transparent p-4 rounded-lg">
            <h2 className="font-bold text-lg text-primarygray mb-4">Recommendations</h2>
            <div>
                {recommendations.map((recommendation, index) => (
                    <div key={recommendation.recommendation_id} className="border-2 border-secondarygray bg-white rounded-lg py-3 px-4 mb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleContent(index)}>
                            <h3 className="font-bold">{removeRecommendationAndStar(recommendation.title)}</h3>
                            <OpenArrow flipDegree={expandedIndex === index ? 0 : 180} />
                        </div>
                        {expandedIndex === index && (
                            <div>{recommendation.main_content}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedChanges;




