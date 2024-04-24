"use client"
import React, { useState } from "react";
import Percent from "../components/Percent";
import Sections from "../components/Sections";

interface AchievementEntry {
    achievementName: string;
    achievementDescription: string;
}

const Achievement: React.FC = () => {
    const [achievementEntries, setAchievementEntries] = useState<AchievementEntry[]>([]);
    const [achievementName, setAchievementName] = useState("");
    const [achievementDescription, setAchievementDescription] = useState("");

    const handleAddJob = () => {
        if (achievementName && achievementDescription) {
            const newAchievment: AchievementEntry = { achievementName, achievementDescription };
            setAchievementEntries([...achievementEntries, newAchievment]);
            // Clear the form fields
            setAchievementName("");
            setAchievementDescription("");
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="flex h-screen bg-editorgray">
            <div className="flex justify-center w-full mt-10 bg-editorgray">
                <div className="bg-white shadow-lg p-8 rounded-md w-11/12 max-w-4xl mx-auto pt-4" style={{ height: "106vh" }}>
                    <div className="text-5xl text-gptgreen font-koh_santepheap font-bold mb-4">Achievement</div>
                    <div className="border-b-2 border-gray-300 mb-4"></div>
                    <div className="pl-4">
                        <p className="text-lg font-light mb-4 text-primarygray">Highlights professional accomplishments and successes to showcase expertise and value to potential employers.</p>
                        {achievementEntries.map((entry, index) => (
                            <div key={index}>
                                <div className="flex">
                                    <div className="flex flex-col mr-20 flex-grow">
                                        <p><strong>Name:</strong> {entry.achievementName}</p>
                                        <p><strong>Description:</strong> {entry.achievementDescription}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Achievement entry form */}
                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow">
                                <label htmlFor="achievementName" className="mb-2 text-primarygray">Achievment Name:</label>
                                <input type="text" id="achievementName" value={achievementName} onChange={(e) => setAchievementName(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />
                                
                                <label htmlFor="achievementDescription" className="mb-2 text-primarygray">Achievment Description:</label>
                                <textarea id="achievementDescription" value={achievementDescription} onChange={(e) => setAchievementDescription(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />
                            </div>
                        </div>

                        <button onClick={handleAddJob} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add Achievement</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-start w-72 text-xl">
                <Percent percent={90} />
                <Sections />
            </div>
        </div>
    );
};

export default Achievement;
