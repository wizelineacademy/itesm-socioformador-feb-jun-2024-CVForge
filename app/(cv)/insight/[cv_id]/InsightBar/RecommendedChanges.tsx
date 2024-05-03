// Package imports
import { useState } from "react";

type RecommendedChangesProps = {
    recommendedChangesList: string
}

const RecommendedChanges: React.FC<RecommendedChangesProps> = ({ recommendedChangesList }) => {
    // Split the recommendations into an array
    const recommendationsArray = recommendedChangesList.split('\n');

    return (
        <div className="">
            <h2 className="font-bold text-lg font-inter text-primarygray">
                Recommendations
            </h2>
            <ul className="list-none pl-6">
                {recommendationsArray.map((recommendation, index) => (
                    // Conditionally render list item with or without bullet point
                    recommendation.trim() ? (
                        <li key={index} className="mb-2">{recommendation}</li>
                    ) : (
                        <li key={index} className="mb-2 list-none">{recommendation}</li>
                    )
                ))}
            </ul>
        </div>
    )
}

export default RecommendedChanges;
