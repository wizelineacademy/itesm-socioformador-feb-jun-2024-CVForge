"use client"
import React, { useState } from "react";
import Percent from "../components/Percent";
import Sections from "../components/Sections";

const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const tagOptions = ["Soft Skills", "Programming Langugaes", "Tools", "Technologies"];

interface SkillEntry {
    skillTitle: string;
    skillDuration: string;
    skillLevel: string;
    skillTag: string;
}

const Skills: React.FC = () => {
    const [skillEntries, setSkillEntries] = useState<SkillEntry[]>([]);
    const [skillTitle, setSkillTitle] = useState("");
    const [skillDuration, setSkillDuration] = useState("");
    const [skillLevel, setSkillLevel] = useState("");
    const [skillTag, setSkillTag] = useState("");

    const handleAddJob = () => {
        if (skillTitle && skillDuration && skillLevel && skillTag) {
            const newSkill: SkillEntry = { skillTitle, skillDuration, skillLevel, skillTag};
            setSkillEntries([...skillEntries, newSkill]);
            // Clear the form fields
            setSkillTitle("");
            setSkillDuration("");
            setSkillLevel("");
            setSkillTag("");
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="flex h-screen bg-transparent">
            <div className="flex justify-center mt-10 bg-transparent w-full">
                <div className="bg-white shadow-lg p-8 rounded-md w-11/12 max-w-4xl mx-auto pt-4" style={{ height: "106vh" }}>
                    <div className="text-5xl text-gptgreen font-koh_santepheap font-bold mb-4">Skills</div>
                    <div className="border-b-2 border-gray-300 mb-4"></div>
                    <div className="pl-4">
                        <p className="text-lg font-light mb-4 text-primarygray">Personal information that will be shown regardless of desired position</p>
                        {skillEntries.map((entry, index) => (
                            <div key={index}>
                                <div className="flex">
                                    <div className="flex flex-col mr-20 flex-grow">
                                        <p><strong>Title:</strong> {entry.skillTitle}</p>
                                        <p><strong>Duration:</strong> {entry.skillDuration}</p>
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <p><strong>Level:</strong> {entry.skillLevel}</p>
                                        <p><strong>Tag:</strong> {entry.skillTag}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Job entry form */}
                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow">
                                <label htmlFor="jobName" className="mb-2 text-primarygray">Title:</label>
                                <input type="text" id="jobName" value={skillTitle} onChange={(e) => setSkillTitle(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />
                                
                                <label htmlFor="jobDescription" className="mb-2 text-primarygray">Duration:</label>
                                <input type="text" id="jobDescription" value={skillDuration} onChange={(e) => setSkillDuration(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label htmlFor="jobPosition" className="mb-2 text-primarygray">Level:</label>
                                <select id="jobPosition" value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray">
                                    <option value="">Select Level</option>
                                    {levelOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow">
                                <label htmlFor="startDate" className="mb-2 text-primarygray">Tag:</label>
                                <select id="startDate" value={skillTag} onChange={(e) => setSkillTag(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray">
                                    <option value="">Select Tag</option>
                                    {tagOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button onClick={handleAddJob} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add Job</button>
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

export default Skills;
