<<<<<<< HEAD
'use client'
import { setCurrentTab } from '@/contexts/cv/sidebar/currentTab'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import GalleryLoading from '@/app/components/loading'

// Package imports
import { useEffect, useState } from 'react'
import React, { useRef } from 'react'

// Icon imports
import OpenArrow_icon from '@/public/assets/cv/insight/OpenArrow_icon'
import { recommendation } from '@prisma/client'
import { use } from 'chai'
=======
"use client";
import { setCurrentTab } from "@/contexts/cv/sidebar/currentTab";
import { useDispatch } from "react-redux";
import Link from "next/link";
import GalleryLoading from "@/app/components/loading";

// Package imports
import { useEffect, useState } from "react";
import React, { useRef } from "react";

// Icon imports
import OpenArrow_icon from "@/public/assets/cv/insight/OpenArrow_icon";
import { recommendation } from "@prisma/client";
import { use } from "chai";
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
import {
  findRecommendationById,
  findRecommendationsByCvId,
  getAllRecommendation,
<<<<<<< HEAD
} from '@/services/recommendationService'
import SearchBar from '../../cv_gallery/components/SearchBar'
import useScrollPosition from '@/hooks/useScrollPosition'

type RecommendationItem = {
  recommendationItemData: recommendation
  isLast: boolean
  completedStatusChange: (recommendation: recommendation) => void
}

function removeRecommendationAndStar(inputString: string): string {
  const filteredString = inputString
    .replace(/Recommendation/g, '')
    .replace(/\*/g, '')
    .replace(/:/g, '')
  return filteredString
=======
} from "@/services/recommendationService";
import SearchBar from "../../cv_gallery/components/SearchBar";
import useScrollPosition from "@/hooks/useScrollPosition";

type RecommendationItem = {
  recommendationItemData: recommendation;
  isLast: boolean;
  completedStatusChange: (recommendation: recommendation) => void;
};

function removeRecommendationAndStar(inputString: string): string {
  const filteredString = inputString
    .replace(/Recommendation/g, "")
    .replace(/\*/g, "")
    .replace(/:/g, "");
  return filteredString;
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
}

const RecommendationItem: React.FC<RecommendationItem> = ({
  recommendationItemData,
  isLast,
  completedStatusChange,
}) => {
  const [completed, setCompleted] = useState<boolean>(
    recommendationItemData.completed,
<<<<<<< HEAD
  )

  const handleCompletedStatusChange = () => {
    const newCompletedStatus = !completed
    setCompleted(newCompletedStatus)
    completedStatusChange({
      ...recommendationItemData,
      completed: newCompletedStatus,
    })
  }
=======
  );

  const handleCompletedStatusChange = () => {
    const newCompletedStatus = !completed;
    setCompleted(newCompletedStatus);
    completedStatusChange({
      ...recommendationItemData,
      completed: newCompletedStatus,
    });
  };
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

  return (
    <li className="flex flex-row font-inter">
      {/* buttons */}
      <div className="flex flex-col items-center">
        <button
          onClick={handleCompletedStatusChange}
<<<<<<< HEAD
          aria-label={`Mark ${recommendationItemData.title} as ${completed ? 'incomplete' : 'complete'}`}
          className="w-[31px] h-[35px] border border-[3px] border-secondarygray rounded-xl flex justify-center items-center"
        >
          <span
            className={`w-[21px] h-[21px] rounded-xl ${completed ? 'bg-gptgreen' : 'bg-transparent'}`}
=======
          aria-label={`Mark ${recommendationItemData.title} as ${completed ? "incomplete" : "complete"}`}
          className="w-[31px] h-[35px] border border-[3px] border-secondarygray rounded-xl flex justify-center items-center"
        >
          <span
            className={`w-[21px] h-[21px] rounded-xl ${completed ? "bg-gptgreen" : "bg-transparent"}`}
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
          ></span>
        </button>
        {!isLast && <div className="w-[3px] h-full bg-secondarygray"></div>}
        {isLast && <div className="w-[3px] h-full bg-transparent"></div>}
      </div>
      {/* text */}
      <div className="flex flex-col mb-7 ml-4 mt-[-3px] bg-white rounded rounded-xl shadow-lg">
        <div className="p-3">
          <h3 className="font-semibold text-2xl">
            {removeRecommendationAndStar(recommendationItemData.title)}
          </h3>
          <p className="text-secondarygray text-lg">
            {recommendationItemData.main_content}
          </p>
        </div>
      </div>
    </li>
<<<<<<< HEAD
  )
}

const Roadmap: React.FC = ({ params }: { params: { cv_id: string } }) => {
  // Set the current tab context
  const dispatch = useDispatch()
  dispatch(setCurrentTab('cv_gallery'))
=======
  );
};

const Roadmap: React.FC = ({ params }: { params: { cv_id: string } }) => {
  // Set the current tab context
  const dispatch = useDispatch();
  dispatch(setCurrentTab("cv_gallery"));
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

  // Hold fetched recommendations
  //const [fetchedRecommendations, setFetchedRecommendations] = useState<recommendation[]>(FETCHED_RECOMMENDATIONS)
  const [fetchedRecommendations, setFetchedRecommendations] = useState<
    recommendation[]
<<<<<<< HEAD
  >([])
=======
  >([]);
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

  // Timer to handle the completed status change
  // When the user changes the completed status of a recommendation, POST that modified status
  // The system waits for a timer to be completed to modify the status
  // If the user reverts the completed status back to the one that is currently posted,
  // the timer will be cleared to prevent sending multiple POSTs
  const [debounceTimers, setDebounceTimers] = useState<{
<<<<<<< HEAD
    [key: string]: NodeJS.Timeout
  }>({})
=======
    [key: string]: NodeJS.Timeout;
  }>({});
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

  // Receives a recommendation and checks if the completed status is different from the one being stored in the state
  // If it is different it calls a timer to POST the new status
  // If the status reverts before the timer is completed, the timer clears
  const handleCompletedRecommendationItem = (
    modifiedRecommendation: recommendation,
  ) => {
    const { recommendation_id, completed: newCompletedStatus } =
<<<<<<< HEAD
      modifiedRecommendation
    const existingRecommendation = fetchedRecommendations.find(
      (r) => r.recommendation_id === recommendation_id,
    )
=======
      modifiedRecommendation;
    const existingRecommendation = fetchedRecommendations.find(
      (r) => r.recommendation_id === recommendation_id,
    );
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

    // If the recommendation differs from the current state
    if (
      existingRecommendation &&
      existingRecommendation.completed !== newCompletedStatus
    ) {
      // If there is already a timer for the recommendation, clear it
      if (debounceTimers[recommendation_id]) {
<<<<<<< HEAD
        clearTimeout(debounceTimers[recommendation_id])
=======
        clearTimeout(debounceTimers[recommendation_id]);
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
      }

      // Set a debounce timer to then call the post
      const timer = setTimeout(() => {
<<<<<<< HEAD
        postCompletedStatus(modifiedRecommendation)
        // Modify the state that holds the completed status for the recommendations
        updateRecommendationInState(modifiedRecommendation)
      }, 2_000) // Debounce for 2 seconds
      setDebounceTimers({ ...debounceTimers, [recommendation_id]: timer })
=======
        postCompletedStatus(modifiedRecommendation);
        // Modify the state that holds the completed status for the recommendations
        updateRecommendationInState(modifiedRecommendation);
      }, 2_000); // Debounce for 2 seconds
      setDebounceTimers({ ...debounceTimers, [recommendation_id]: timer });
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
    }
    // If there is already a timer, but the new completed status is the same as the current state,
    // remove the timer
    else if (
      existingRecommendation &&
      existingRecommendation.completed === newCompletedStatus
    ) {
      if (debounceTimers[recommendation_id]) {
        // Remove timer if it exists
<<<<<<< HEAD
        clearTimeout(debounceTimers[recommendation_id])
      }
    } else {
      console.error('No recommendation matches the id provided')
    }
  }
=======
        clearTimeout(debounceTimers[recommendation_id]);
      }
    } else {
      console.error("No recommendation matches the id provided");
    }
  };
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

  // Handle the POST service to update the recommendation completed status
  const postCompletedStatus = (recommendation: recommendation) => {
    console.log(
      `POST request sent for recommendation ID: ${recommendation.recommendation_id} with completed status: ${recommendation.completed}`,
<<<<<<< HEAD
    )
    // Replace this console.log with your actual POST request logic
  }
=======
    );
    // Replace this console.log with your actual POST request logic
  };
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

  // Receives a modified recommendation object to update in the recommendations state
  const updateRecommendationInState = (
    updatedRecommendation: recommendation,
  ) => {
    const newRecommendations = fetchedRecommendations.map((rec) =>
      rec.recommendation_id === updatedRecommendation.recommendation_id
        ? { ...rec, completed: updatedRecommendation.completed }
        : rec,
<<<<<<< HEAD
    )
    setFetchedRecommendations(newRecommendations)
  }
=======
    );
    setFetchedRecommendations(newRecommendations);
  };
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

  // Here must fetch the recommendation data for the CV call everytime the authentication token has been modified set the fetched recommendation state
  useEffect(() => {
    // setFetchedRecommendations()
    const fetchRecommendations = async () => {
      try {
        const recommendationsArray = await findRecommendationsByCvId(
          params.cv_id,
<<<<<<< HEAD
        )
        setFetchedRecommendations(recommendationsArray)
      } catch (error) {
        console.error('Failed to fetch recommendations', error)
      }
    }

    fetchRecommendations()
  }, [params.cv_id])

  const ulRef = useRef(null)
  const isNearTop = useScrollPosition(ulRef)
=======
        );
        setFetchedRecommendations(recommendationsArray);
      } catch (error) {
        console.error("Failed to fetch recommendations", error);
      }
    };

    fetchRecommendations();
  }, [params.cv_id]);

  const ulRef = useRef(null);
  const isNearTop = useScrollPosition(ulRef);
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

  return (
    <div className="flex h-screen overflow-y-scroll justify-center">
      <div className="flex flex-col ">
        {/* Top part */}
<<<<<<< HEAD
        <div className={`flex flex-col w-full ${isNearTop ? '' : 'shadow-lg'}`}>
          <Link
            href={'/cv_gallery'}
=======
        <div className={`flex flex-col w-full ${isNearTop ? "" : "shadow-lg"}`}>
          <Link
            href={"/cv_gallery"}
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
            className="sticky h-10 flex items-center text-secondarygray bg-transparent pl-8 pt-8"
          >
            <OpenArrow_icon flipDegree={270} />
            <p className="text-md font-bold font-inter ">Back to Menu</p>
          </Link>
          <div className="flex flex-col justify-center items-center mx-auto w-[560px] pr-10 pb-5 top-0">
            <p className="text-4xl text-primarygray font-bold font-koh_santepheap">
              Roadmap
            </p>
            <p className="text-secondarygray text-center w-fill text-lg m-2 mt-5">
              This roadmap delineates recommended challenges suggested by our AI
              to enhance your qualifications and increase your likelihood of
              securing your desired position.
            </p>
          </div>
        </div>
        {/* Scroll area */}
        <ul ref={ulRef} className="overflow-y-scroll mx-12">
          {fetchedRecommendations.length > 0 ? (
            fetchedRecommendations.map((recommendation, index) => (
              <RecommendationItem
                key={recommendation.recommendation_id}
                recommendationItemData={recommendation}
                isLast={index === fetchedRecommendations.length - 1}
                completedStatusChange={handleCompletedRecommendationItem}
              />
            ))
          ) : (
            <div className="absolute w-screen h-screen top-0 left-0 bg-primarygray bg-opacity-50 flex justify-center items-center z-20">
              <GalleryLoading />
            </div>
          )}
        </ul>
      </div>
    </div>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

export default Roadmap
/* 

*/
