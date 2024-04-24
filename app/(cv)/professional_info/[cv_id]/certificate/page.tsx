"use client"
import React, { useState } from "react";
import Percent from "../components/Percent";
import Sections from "../components/Sections";

interface CertificateEntry {
    certificateName: string;
    certificateDescription: string;
}

const Certificate: React.FC = () => {
    const [certificateEntries, setCertificateEntries] = useState<CertificateEntry[]>([]);
    const [certificateName, setCertificateName] = useState("");
    const [certificateDescription, setCertificateDescription] = useState("");

    const handleAddJob = () => {
        if (certificateName && certificateDescription) {
            const newJob: CertificateEntry = { certificateName, certificateDescription};
            setCertificateEntries([...certificateEntries, newJob]);
            // Clear the form fields
            setCertificateName("");
            setCertificateDescription("");
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="flex h-screen bg-editorgray">
            <div className="flex justify-center w-full bg-editorgray">
                <div className="bg-white shadow-lg p-8 rounded-md w-11/12 max-w-4xl mx-auto pt-4" style={{ height: "106vh" }}>
                    <div className="text-5xl text-gptgreen font-koh_santepheap font-bold mb-4">Certificate</div>
                    <div className="border-b-2 border-gray-300 mb-4"></div>
                    <div className="pl-4">
                        <p className="text-lg font-light mb-4 text-primarygray">Demonstrates specialized skills and expertise acquired through accredited courses or training programs.</p>
                        {certificateEntries.map((entry, index) => (
                            <div key={index}>
                                <div className="flex">
                                    <div className="flex flex-col mr-20 flex-grow">
                                        <p><strong>Name:</strong> {entry.certificateName}</p>
                                        <p><strong>Description:</strong> {entry.certificateDescription}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Job entry form */}
                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow">
                                <label htmlFor="certficateName" className="mb-2 text-primarygray">Name:</label>
                                <input type="text" id="certficateName" value={certificateName} onChange={(e) => setCertificateName(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />
                                
                                <label htmlFor="certificateDescription" className="mb-2 text-primarygray">Description:</label>
                                <textarea id="certificateDescription" value={certificateDescription} onChange={(e) => setCertificateDescription(e.target.value)} className="border border-gray-300 p-2 w-full mb-4 text-primarygray" />

                            </div>
                        </div>

                        <button onClick={handleAddJob} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add Certificate</button>
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

export default Certificate;
