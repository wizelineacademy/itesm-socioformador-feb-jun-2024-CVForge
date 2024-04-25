"use client";
import Link from "next/link";
// !DELETE
import { FETCHED_RECOMMENDATIONS } from "../../insight/[cv_id]/CONSTANTS";
// This type must be removed, instead, update the prisma schema
type recommendation_fake = {
    recommendation_id: string,
    cv_insight_id: string,
    title: string,
    main_content: string,
    completed: boolean,
}

// Package imports
import { useEffect, useState } from "react";

// Icon imports
import OpenArrow_icon from "@/public/assets/cv/insight/OpenArrow_icon";
import { recommendation } from "@prisma/client";

type RecommendationItem = {
    recommendationItemData: recommendation_fake,
    isLast: boolean,
    completedStatusChange: (recommendation_id: recommendation_fake) => void;
}

const RecommendationItem: React.FC<RecommendationItem> = ({ recommendationItemData, isLast, completedStatusChange }) => {
    const [completed, setCompleted] = useState<boolean>(recommendationItemData.completed);

    const handleCompletedStatusChange = () => {
        const newCompletedStatus = !completed;

        setCompleted(newCompletedStatus);

        const newRoadmapItemData: recommendation_fake = {
            ...recommendationItemData,
            completed: newCompletedStatus
        };
        completedStatusChange(newRoadmapItemData);
    }


    return (
        <li className="flex flex-row font-inter">
            <div className="flex flex-col items-center">
                <button onClick={handleCompletedStatusChange}
                    aria-label={`Mark ${recommendationItemData.title} as ${completed ? 'incomplete' : 'complete'}`}
                    className="w-[26px] h-[26px] border border-1 border-secondarygray rounded-full flex justify-center items-center">
                    <span className={`w-[20px] h-[20px] rounded-full ${completed ? "bg-gptgreen" : "bg-white"}`}></span>
                </button>
                {!isLast && <div className="w-[1px] h-full bg-secondarygray"></div>}
            </div>
            <div className="flex flex-col mb-6 ml-4">
                <h3 className="font-semibold text-2xl">{recommendationItemData.title}</h3>
                <p className="text-secondarygray text-lg">{recommendationItemData.main_content}</p>
            </div>
        </li>
    )
}

const Roadmap: React.FC = () => {
    // Hold fetched recommendations
    const [fetchedRecommendations, setFetchedRecommendations] = useState<recommendation_fake[]>(FETCHED_RECOMMENDATIONS)

    // Hold items marked as completed
    // Set the initial state as the 
    const [modifiedRecommendations, setModifiedRecommendations] = useState<recommendation_fake[]>([])

    // The handler receives a recommendation which the complete field is being modified
    // It obtains the index of the original recommendation
    // It compares the original recommendation with the recommendation being modified
    // The goal is to add modified recommendations in the modifiedRecommendations array, to then update them in the db
    const handleCompletedRecommendationItem = (recommendation: recommendation_fake) => {
        // Check if recommendation exists in fetchedRecommendations
        if (fetchedRecommendations) {
            const indexInFetched = fetchedRecommendations.findIndex(fetchedRecommendation => fetchedRecommendation.recommendation_id === recommendation.recommendation_id);

            if (indexInFetched !== -1) {
                const fetchedItem = fetchedRecommendations[indexInFetched];
                const isDifferentFromFetched = fetchedItem.completed !== recommendation.completed;

                if (modifiedRecommendations) {
                    const indexInModified = modifiedRecommendations.findIndex(modifiedRecommendation => modifiedRecommendation.recommendation_id === recommendation.recommendation_id);

                    // Modify or add the recommendation in the modified list
                    const newModifiedRecommendations = [...modifiedRecommendations];

                    if (isDifferentFromFetched) {
                        // If different, add or update in modifiedRecommendations
                        if (indexInModified !== -1) {
                            newModifiedRecommendations[indexInModified] = recommendation; // Update existing
                        } else {
                            newModifiedRecommendations.push(recommendation); // Add new
                        }
                    } else if (indexInModified !== -1) {
                        // Remove unchanged recommendation
                        newModifiedRecommendations.splice(indexInModified, 1);
                    }

                    setModifiedRecommendations(newModifiedRecommendations);
                } else if (isDifferentFromFetched) {
                    // Handle case when no modified recommendations exist yet
                    setModifiedRecommendations([recommendation]);
                }
            }
        }
    };

    useEffect(() => {
        
    }, [modifiedRecommendations])

    return (
        <div className="w-full min-h-screen font-inter text-primarygray bg-bg px-16">
            <Link href={"/"}
                className="sticky top-0 w-full h-10 flex items-center text-secondarygray bg-bg">
                <OpenArrow_icon flipDegree={270} />
                Back to Menu
            </Link>


            {/* Roadmap description */}
            <div className="w-full flex flex-col text-center mt-4">
                <h1 className="font-black text-3xl">
                    Roadmap
                </h1>
                <p className="text-secondarygray self-center w-1/2 text-xl mt-4">This roadmap delineates recommended challenges suggested by our AI to enhance your qualifications and increase your likelihood of securing your desired position.</p>
            </div>
            {/* Roadmap points */}
            <ul className="mt-10">
                {
                    fetchedRecommendations ?
                        fetchedRecommendations.map((recommendation, index) => (
                            <RecommendationItem
                                key={recommendation.recommendation_id}
                                recommendationItemData={recommendation}
                                isLast={index === fetchedRecommendations.length - 1}
                                completedStatusChange={handleCompletedRecommendationItem}
                            />
                        ))
                        : <p>No recommendations available</p>
                }
            </ul>
        </div>
    )
}

export default Roadmap;