"use client"
import React, { useState } from "react";
import Percent from "../components/Percent";
import Sections from "../components/Sections";

const GeneralInfo: React.FC = () => {
    // State hooks for managing input values
    const [jobName, setJobName] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobPosition, setJobPosition] = useState("");
    const [dob, setDOB] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [nationality, setNationality] = useState("");
    const [postalCode, setPostalCode] = useState("");

    return (
        <div className="flex h-screen bg-editorgray">
            <div className="flex justify-center w-full">
            <div className="bg-white shadow-lg p-8 rounded-md w-11/12 max-w-4xl mx-auto pt-4" style={{ height: "106vh" }}>
                    {/* Content of the first container */}
                    <div className="text-5xl text-gptgreen font-koh_santepheap font-bold mb-4">Work Experience</div>
                    <div className="border-b-2 border-gray-300 mb-4"></div>
                    <div className="pl-4">
                        {/* Your content */}
                        <div className="text-4xl font-koh_santepheap font-bold mb-2 text-primarygray font-bold">Previous Jobs</div>
                        <p className="text-lg font-light mb-4 text-primarygray">Personal information that will be shown regardless of desired position</p>
                        
                        {/* IDENTITY */}
                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow ">
                                <label htmlFor="jobName" className="mb-2 text-primarygray">Name:</label>
                                <input type="text" id="position" value={jobName} onChange={(e) => setJobName(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />
                                
                                <label htmlFor="jobDescription" className="mb-2 text-primarygray">Description:</label>
                                <input type="text" id="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label htmlFor="jobPosition" className="mb-2 text-primarygray">Position:</label>
                                <input type="text" id="jobPosition" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-start items-end text-1xl">
                {/* Container with dynamic width */}
                <div className="w-72">
                    {/* Call Percent component with a percent prop */}
                    <Percent percent={90} />
                    {/* Call Sections component */}
                    <Sections />
                </div>
            </div>
        </div>
    );
}

export default GeneralInfo;
