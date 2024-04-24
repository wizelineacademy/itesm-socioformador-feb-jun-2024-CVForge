"use client"
import React, { useState } from "react";
import Percent from "../components/Percent";
import Sections from "../components/Sections";

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
    
    // State hooks for tracking focus and text input
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className="flex h-screen bg-editorgray">
            <div className="flex justify-center w-full">
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
                                <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} className={`border p-2 w-full mb-4 text-primarygray ${isFocused || firstName ? 'block w-96 h-12 border bg-transparent border-gradient rounded-md mb-4' : ''}`} />
                                
                                <label htmlFor="pronouns" className="mb-2 text-primarygray font-bold">Pronouns:</label>
                                <input type="text" id="pronouns" value={pronouns} onChange={(e) => setPronouns(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} className={`border p-2 w-full mb-4 text-primarygray ${isFocused || pronouns ? 'block w-96 h-12 border bg-transparent border-gradient rounded-md mb-4' : ''}`} />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label htmlFor="lastName" className="mb-2 text-primarygray font-bold">Last Name:</label>
                                <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} className={`border p-2 w-full mb-4 text-primarygray ${isFocused || lastName ? 'block w-96 h-12 border bg-transparent border-gradient rounded-md mb-4' : ''}`} />
                                
                                <label htmlFor="dob" className="mb-2 text-primarygray font-bold">Date of Birth:</label>
                                <input type="text" id="dob" value={dob} onChange={(e) => setDOB(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} className={`border p-2 w-full mb-4 text-primarygray ${isFocused || dob ? 'block w-96 h-12 border bg-transparent border-gradient rounded-md mb-4' : ''}`} />
                            </div>
                        </div>

                        {/* CONTACT INFO */}
                        <div className="text-3xl font-bold mb-2 text-primarygray font-bold">Contact Info</div>
                        <p className="text-lg font-light mb-4 text-primarygray">Information on how to contact the user in case of desiring contact</p>
                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow">
                                <label htmlFor="email" className="mb-2 text-primarygray font-bold">Email:</label>
                                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} className={`border p-2 w-full mb-4 text-primarygray ${isFocused || email ? 'block w-96 h-12 border bg-transparent border-gradient rounded-md mb-4' : ''}`} />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label htmlFor="phone" className="mb-2 text-primarygray font-bold">Phone:</label>
                                <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} className={`border p-2 w-full mb-4 text-primarygray ${isFocused || phone ? 'block w-96 h-12 border bg-transparent border-gradient rounded-md mb-4' : ''}`} />
                            </div>
                        </div>

                        {/* NATIONALITY */}
                        <div className="text-3xl font-bold mb-2 text-primarygray font-bold">Nationality</div>
                        <p className="text-lg font-light mb-4 text-primarygray">Any information regarding your residency, nationality, etc</p>
                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow">
                                <label htmlFor="country" className="mb-2 text-primarygray font-bold">Country:</label>
                                <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} className={`border p-2 w-full mb-4 text-primarygray ${isFocused || country ? 'block w-96 h-12 border bg-transparent border-gradient rounded-md mb-4' : ''}`} />
                                
                                <label htmlFor="address" className="mb-2 text-primarygray font-bold">Address:</label>
                                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} className={`border p-2 w-full mb-4 text-primarygray ${isFocused || address ? 'block w-96 h-12 border bg-transparent border-gradient rounded-md mb-4' : ''}`} />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label htmlFor="nationality" className="mb-2 text-primarygray font-bold">Nationality:</label>
                                <input type="text" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} className={`border p-2 w-full mb-4 text-primarygray ${isFocused || nationality ? 'block w-96 h-12 border bg-transparent border-gradient rounded-md mb-4' : ''}`} />
                                
                                <label htmlFor="postalcode" className="mb-2 text-primarygray font-bold">Postal Code:</label>
                                <input type="text" id="postalcode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} className={`border p-2 w-full mb-4 text-primarygray ${isFocused || postalCode ? 'block w-96 h-12 border bg-transparent border-gradient rounded-md mb-4' : ''}`} />
                            </div>
                        

                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center w-72 text-xl ">
                {/* Container with dynamic width */}
                    {/* Call Percent component with a percent prop */}
                    <Percent percent={90} />
                    {/* Call Sections component */}
                    <Sections />
                </div>
            </div>
    );
}


export default GeneralInfo;
