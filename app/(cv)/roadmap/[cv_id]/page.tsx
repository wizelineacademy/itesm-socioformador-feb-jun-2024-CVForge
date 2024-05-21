"use client";
import { setCurrentTab } from "@/contexts/cv/sidebar/currentTab";
import { useDispatch } from "react-redux";
import Link from "next/link";
// !DELETE, placeholder for the recommendations, must actually fetch the recommendations
import { FETCHED_RECOMMENDATIONS } from "../../cv/[cv_id]/CONSTANTS";

// Package imports
import { useEffect, useState } from "react";
import React, { useRef } from 'react';


// Icon imports
import OpenArrow_icon from "@/public/assets/cv/insight/OpenArrow_icon";
import { recommendation } from "@prisma/client";
import { use } from "chai";
import { findRecommendationById, findRecommendationsByCvId, getAllRecommendation } from "@/services/recommendationService";
import SearchBar from "../../cv_gallery/components/SearchBar";
import useScrollPosition from "@/hooks/useScrollPosition";

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
            
            {/* buttons */}
            <div className="flex flex-col items-center">
                <button onClick={handleCompletedStatusChange}
                    aria-label={`Mark ${recommendationItemData.title} as ${completed ? 'incomplete' : 'complete'}`}
                    className="w-[31px] h-[35px] border border-[3px] border-secondarygray rounded-full flex justify-center items-center">
                    <span className={`w-[21px] h-[21px] rounded-full ${completed ? "bg-gptgreen" : "bg-transparent"}`}></span>
                </button>
                {!isLast && <div className="w-[3px] h-full bg-secondarygray"></div>}
                {isLast && <div className="w-[3px] h-full bg-transparent"></div>}
            </div>
            {/* text */}
            <div className="flex flex-col mb-7 ml-4 mt-[-3px] bg-white rounded rounded-xl shadow-lg">
                <div className="p-3">
                    <h3 className="font-semibold text-2xl">{recommendationItemData.title}</h3>
                    <p className="text-secondarygray text-lg">{recommendationItemData.main_content}</p>
                </div>
            </div>
        </li>
    )
}

const Roadmap: React.FC = ({ params }: { params: { cv_id: string } }) => {
    // Set the current tab context
    const dispatch = useDispatch()
    dispatch(setCurrentTab("cv_gallery"))

    // Hold fetched recommendations
    //const [fetchedRecommendations, setFetchedRecommendations] = useState<recommendation[]>(FETCHED_RECOMMENDATIONS)
    const [fetchedRecommendations, setFetchedRecommendations] = useState<recommendation[]>([]);

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
        const fetchRecommendations = async () => {
            try {
                const recommendationsArray = await findRecommendationsByCvId(params.cv_id);
                setFetchedRecommendations(recommendationsArray);
            } catch (error) {
                console.error("Failed to fetch recommendations", error);
            }
        };

        fetchRecommendations();
    }, [params.cv_id])  

    const ulRef = useRef(null);
    const isNearTop = useScrollPosition(ulRef);

    return (
        <div className="flex flex-col bg-editorgray h-screen">
            {/* Top part */}
            <div className={`flex flex-col w-full ${isNearTop? '' : 'shadow-lg'}`}>
                <Link href={"/cv_gallery"} className="sticky h-10 flex items-center text-secondarygray bg-transparent pl-8 pt-8">
                    <OpenArrow_icon flipDegree={270} /><p className="text-md font-bold font-inter ">Back to Menu</p>
                </Link>
                <div className="flex flex-col justify-center items-center mx-[300px] pr-10 pb-5 top-0">
                    <p className="text-4xl text-primarygray font-bold font-koh_santepheap">Roadmap</p>
                    <p className="text-secondarygray text-center w-fill text-lg m-2 mt-5">This roadmap delineates recommended challenges suggested by our AI to enhance your qualifications and increase your likelihood of securing your desired position.</p>
                </div>
            </div>
            {/* Scroll area */}
            <ul ref={ulRef} className="overflow-y-scroll mx-12">{
                fetchedRecommendations.length > 0 ? fetchedRecommendations.map((recommendation, index) => (
                    <RecommendationItem
                        key={recommendation.recommendation_id}
                        recommendationItemData={recommendation}
                        isLast={index === fetchedRecommendations.length - 1}
                        completedStatusChange={handleCompletedRecommendationItem}
                    />
                )): <p>No recommendations available</p>
            }</ul>
        </div>
    )
}

export default Roadmap;
/* 

*/