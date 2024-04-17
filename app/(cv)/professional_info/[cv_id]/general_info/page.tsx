import React from "react";
import Percent from "../components/Percent";
import Sections from "../components/Sections";

const GeneralInfo: React.FC = () => {
    return (
        <div className="flex h-screen">
            <div className="flex justify-center w-full">
                <div className="bg-white shadow-lg p-8 rounded-md w-11/12 max-w-4xl mx-auto pt-4">
                    {/* Content of the first container */}
                    <div className="text-2xl font-bold mb-4">General Information</div>
                    <div className="border-b-2 border-gray-300 mb-4"></div>
                    <div className="pl-4">
                        {/* Your content */}
                        <div className="text-3xl font-bold mb-2">Identity</div>
                        <p className="text-lg font-light mb-4">Personal information that will be shown regardless of desired position</p>
                        
                        {/* IDENTITY */}
                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow">
                                <label htmlFor="firstName" className="mb-2">First Name:</label>
                                <input type="text" id="firstName" className="border border-gray-300 p-2 w-full mb-4" />
                                
                                <label htmlFor="pronouns" className="mb-2">Pronouns:</label>
                                <input type="text" id="pronouns" className="border border-gray-300 p-2 w-full mb-4" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label htmlFor="lastName" className="mb-2">Last Name:</label>
                                <input type="text" id="lastName" className="border border-gray-300 p-2 w-full mb-4" />
                                
                                <label htmlFor="dob" className="mb-2">Date of Birth:</label>
                                <input type="text" id="dob" className="border border-gray-300 p-2 w-full mb-4" />
                            </div>
                        </div>

                        {/* CONTACT INFO */}
                        <div className="text-3xl font-bold mb-2">Contact Info</div>
                        <p className="text-lg font-light mb-4">Information on how to contact the user in case of desiring contact</p>
                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow">
                                <label htmlFor="email" className="mb-2">Email:</label>
                                <input type="text" id="email" className="border border-gray-300 p-2 w-full mb-4" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label htmlFor="phone" className="mb-2">Phone:</label>
                                <input type="text" id="phone" className="border border-gray-300 p-2 w-full mb-4" />
                            </div>
                        </div>

                        {/* NATIONALITY */}
                        <div className="text-3xl font-bold mb-2">Nationality</div>
                        <p className="text-lg font-light mb-4">Any information regarding your residency, nationality, etc</p>
                        <div className="flex">
                            <div className="flex flex-col mr-20 flex-grow">
                                <label htmlFor="country" className="mb-2">Country:</label>
                                <input type="text" id="country" className="border border-gray-300 p-2 w-full mb-4" />
                                
                                <label htmlFor="address" className="mb-2">Address:</label>
                                <input type="text" id="address" className="border border-gray-300 p-2 w-full mb-4" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label htmlFor="nationality" className="mb-2">Nationality:</label>
                                <input type="text" id="nationality" className="border border-gray-300 p-2 w-full mb-4" />
                                
                                <label htmlFor="postalcode" className="mb-2">Postal Code:</label>
                                <input type="text" id="postalcode" className="border border-gray-300 p-2 w-full mb-4" />
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