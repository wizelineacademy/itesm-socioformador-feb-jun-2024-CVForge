"use client"

// Package imports
import { useState } from "react";


type RecommendedChangesProps = {
    recommendedChangesList: string
}
const RecommendedChanges: React.FC<RecommendedChangesProps> = ({ recommendedChangesList }) => {
    return (
        <div className="">
            <h2 className="font-bold text-lg font-inter text-primarygray">
                Recommendations
            </h2>
            <ul className="list-disc pl-4">
                {/* {
                    recommendedChangesList.map((recommendation) =>
                        <li key={crypto.randomUUID()}>{recommendation}</li>
                    )
                } */}
                {recommendedChangesList}
            </ul>
        </div>
    )

}

export default RecommendedChanges