"use client";
import Link from "next/link";
// !DELETE, placeholder for the recommendations, must actually fetch the recommendations
import { FETCHED_RECOMMENDATIONS } from "../../insight/[cv_id]/CONSTANTS";

// Package imports
import { useEffect, useState } from "react";

// Icon imports
import OpenArrow_icon from "@/public/assets/cv/insight/OpenArrow_icon";
import { recommendation } from "@prisma/client";

type RecommendationItem = {
    recommendationItemData: recommendation,
    isLast: boolean,
    completedStatusChange: (recommendation: recommendation) => void;
}

const RecommendationItem: React.FC<RecommendationItem> = ({ recommendationItemData, isLast, completedStatusChange }) => {
    const [completed, setCompleted] = useState<boolean>(recommendationItemData.completed);

    // Change the completed status, sends to the parent and also updates internally to reflect visually
    const handleCompletedStatusChange = () => {
        const newCompletedStatus = !completed;
        setCompleted(newCompletedStatus);
        completedStatusChange({ ...recommendationItemData, completed: newCompletedStatus });
    };

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
    const [fetchedRecommendations, setFetchedRecommendations] = useState<recommendation[]>(FETCHED_RECOMMENDATIONS)

    // Timer to handle the completed status change
    // When the user changes the completed status of a recommendation, POST that modified status
    // The system waits for a timer to be completed to modify the status
    // If the user reverts the completed status back to the one that is currently posted, 
    // the timer will be cleared to prevent sending multiple POSTs
    const [debounceTimers, setDebounceTimers] = useState<{ [key: string]: NodeJS.Timeout }>({});

    // Receives a recommendation and checks if the completed status is different from the one being stored in the state
    // If it is different it calls a timer to POST the new status
    // If the status reverts before the timer is completed, the timer clears
    const handleCompletedRecommendationItem = (modifiedRecommendation: recommendation) => {
        const { recommendation_id, completed: newCompletedStatus } = modifiedRecommendation;
        const existingRecommendation = fetchedRecommendations.find(r => r.recommendation_id === recommendation_id);

        // If the recommendation differs from the current state
        if (existingRecommendation && existingRecommendation.completed !== newCompletedStatus) {

            // If there is already a timer for the recommendation, clear it
            if (debounceTimers[recommendation_id]) {
                clearTimeout(debounceTimers[recommendation_id]);
            }

            // Set a debounce timer to then call the post
            const timer = setTimeout(() => {
                postCompletedStatus(modifiedRecommendation);
                // Modify the state that holds the completed status for the recommendations
                updateRecommendationInState(modifiedRecommendation);
            }, 2_000); // Debounce for 2 seconds
            setDebounceTimers({ ...debounceTimers, [recommendation_id]: timer });
        }
        // If there is already a timer, but the new completed status is the same as the current state,
        // remove the timer
        else if (existingRecommendation && existingRecommendation.completed === newCompletedStatus) {
            if (debounceTimers[recommendation_id]) {
                // Remove timer if it exists
                clearTimeout(debounceTimers[recommendation_id]);
            }
        } else {
            console.error("No recommendation matches the id provided")
        }
    };

    // Handle the POST service to update the recommendation completed status
    const postCompletedStatus = (recommendation: recommendation) => {
        console.log(`POST request sent for recommendation ID: ${recommendation.recommendation_id} with completed status: ${recommendation.completed}`);
        // Replace this console.log with your actual POST request logic
    };

    // Receives a modified recommendation object to update in the recommendations state 
    const updateRecommendationInState = (updatedRecommendation: recommendation) => {
        const newRecommendations = fetchedRecommendations.map(rec =>
            rec.recommendation_id === updatedRecommendation.recommendation_id ? { ...rec, completed: updatedRecommendation.completed } : rec
        );
        setFetchedRecommendations(newRecommendations);
    };

    // Here must fetch the recommendation data for the CV
    // call everytime the authentication token has been modified
    // set the fetched recommendation state
    useEffect(() => {
        // setFetchedRecommendations()
    }, [])

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