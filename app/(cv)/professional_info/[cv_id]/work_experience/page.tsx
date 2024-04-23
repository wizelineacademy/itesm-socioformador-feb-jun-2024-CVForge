"use client"
import React, { useState } from "react";
import Percent from "../components/Percent";
import Sections from "../components/Sections";

interface JobEntry {
    jobName: string;
    jobDescription: string;
    jobPosition: string;
    startDate: string;
    endDate: string;
}

const GeneralInfo: React.FC = () => {
    const [jobEntries, setJobEntries] = useState<JobEntry[]>([]);
    const [jobName, setJobName] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobPosition, setJobPosition] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleAddJob = () => {
        if (jobName && jobDescription && jobPosition && startDate && endDate) {
            const newJob: JobEntry = { jobName, jobDescription, jobPosition, startDate, endDate };
            setJobEntries([...jobEntries, newJob]);
            // Clear the form fields
            setJobName("");
            setJobDescription("");
            setJobPosition("");
            setStartDate("");
            setEndDate("");
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="flex h-screen bg-editorgray">
            <div className="flex justify-center w-full">
                <div className="bg-white shadow-lg p-8 rounded-md w-11/12 max-w-4xl mx-auto pt-4" style={{ height: "106vh" }}>
                    <div className="text-5xl text-gptgreen font-koh_santepheap font-bold mb-4">Work Experience</div>
                    <div className="border-b-2 border-gray-300 mb-4"></div>
                    <div className="pl-4">
                        <div className="text-4xl font-koh_santepheap font-bold mb-2 text-primarygray">Previous Jobs</div>
                        <p className="text-lg font-light mb-4 text-primarygray">Personal information that will be shown regardless of desired position</p>
                        {jobEntries.map((entry, index) => (
                            <div key={index}>
                                <div className="flex">
                                    <div className="flex flex-col mr-20 flex-grow">
                                        <p><strong>Name:</strong> {entry.jobName}</p>
                                        <p><strong>Description:</strong> {entry.jobDescription}</p>
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <p><strong>Position:</strong> {entry.jobPosition}</p>
                                        <p><strong>Start Date:</strong> {entry.startDate}</p>
                                        <p><strong>End Date:</strong> {entry.endDate}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Job entry form */}
                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow">
                                <label htmlFor="jobName" className="mb-2 text-primarygray">Name:</label>
                                <input type="text" id="jobName" value={jobName} onChange={(e) => setJobName(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />
                                
                                <label htmlFor="jobDescription" className="mb-2 text-primarygray">Description:</label>
                                <input type="text" id="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label htmlFor="jobPosition" className="mb-2 text-primarygray">Position:</label>
                                <input type="text" id="jobPosition" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow">
                                <label htmlFor="startDate" className="mb-2 text-primarygray">Start Date:</label>
                                <input type="text" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label htmlFor="endDate" className="mb-2 text-primarygray">End Date:</label>
                                <input type="text" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />
                            </div>
                        </div>

                        <button onClick={handleAddJob} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add Job</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-start items-end text-1xl">
                <div className="w-72">
                    <Percent percent={90} />
                    <Sections />
                </div>
            </div>
        </div>
    );
};

export default GeneralInfo;
