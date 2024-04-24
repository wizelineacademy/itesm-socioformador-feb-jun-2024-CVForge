"use client"
import React, { useState } from "react";
import Percent from "../components/Percent";
import Sections from "../components/Sections";
import { setCurrentTab } from "@/contexts/cv/sidebar/currentTab";
import { useDispatch } from "react-redux";

const GeneralInfo: React.FC = () => {
    // State hooks for managing input values
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [dob, setDOB] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [nationality, setNationality] = useState("");
    const [postalCode, setPostalCode] = useState("");
    // Set the current tab context
    const dispatch = useDispatch()
    dispatch(setCurrentTab("professional_info"))

    return (
        <div className="flex h-screen bg-editorgray">
            <div className="flex justify-center w-full mt-10 bg-editorgray">
                <div className="bg-white shadow-lg p-8 rounded-md w-11/12 max-w-4xl mx-auto pt-4" style={{ height: "106vh" }}>
                    {/* Content of the first container */}
                    <div className="text-5xl text-gptgreen font-koh_santepheap font-bold mb-4">General Information</div>
                    <div className="border-b-2 border-gray-300 mb-4"></div>
                    <div className="pl-4">
                        {/* Your content */}
                        <div className="text-4xl font-koh_santepheap font-bold mb-2 text-primarygray font-bold">Identity</div>
                        <p className="text-lg font-light mb-4 text-primarygray">Personal information that will be shown regardless of desired position</p>

                        {/* IDENTITY */}
                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow ">
                                <label htmlFor="firstName" className="mb-2 text-primarygray font-bold">First Name:</label>
                                <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border p-2 w-full mb-4 text-primarygray" />
                                
                                <label htmlFor="pronouns" className="mb-2 text-primarygray font-bold">Pronouns:</label>
                                <input type="text" id="pronouns" value={pronouns} onChange={(e) => setPronouns(e.target.value)} className="border p-2 w-full mb-4 text-primarygray" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label htmlFor="lastName" className="mb-2 text-primarygray font-bold">Last Name:</label>
                                <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border p-2 w-full mb-4 text-primarygray" />
                                
                                <label htmlFor="dob" className="mb-2 text-primarygray font-bold">Date of Birth:</label>
                                <input type="text" id="dob" value={dob} onChange={(e) => setDOB(e.target.value)} className="border p-2 w-full mb-4 text-primarygray" />
                            </div>
                        </div>

                        {/* CONTACT INFO */}
                        <div className="text-3xl font-bold mb-2 text-primarygray font-bold">Contact Info</div>
                        <p className="text-lg font-light mb-4 text-primarygray">Information on how to contact the user in case of desiring contact</p>
                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow">
                                <label htmlFor="email" className="mb-2 text-primarygray font-bold">Email:</label>
                                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mb-4 text-primarygray" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label htmlFor="phone" className="mb-2 text-primarygray font-bold">Phone:</label>
                                <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-2 w-full mb-4 text-primarygray" />
                            </div>
                        </div>

                        {/* NATIONALITY */}
                        <div className="text-3xl font-bold mb-2 text-primarygray font-bold">Nationality</div>
                        <p className="text-lg font-light mb-4 text-primarygray">Any information regarding your residency, nationality, etc</p>
                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow">
                                <label htmlFor="country" className="mb-2 text-primarygray font-bold">Country:</label>
                                <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="border p-2 w-full mb-4 text-primarygray" />
                                
                                <label htmlFor="address" className="mb-2 text-primarygray font-bold">Address:</label>
                                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="border p-2 w-full mb-4 text-primarygray" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label htmlFor="nationality" className="mb-2 text-primarygray font-bold">Nationality:</label>
                                <input type="text" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} className="border p-2 w-full mb-4 text-primarygray" />
                                
                                <label htmlFor="postalcode" className="mb-2 text-primarygray font-bold">Postal Code:</label>
                                <input type="text" id="postalcode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="border p-2 w-full mb-4 text-primarygray" />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-start w-72 text-xl">
                <Percent percent={90} />
                <Sections />
            </div>

        </div>
    );
}

export default GeneralInfo;
