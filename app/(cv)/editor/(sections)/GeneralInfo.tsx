import React, { useState, useEffect } from 'react';
import { createGeneralInfo, getGeneralInfo } from "@/services/professional_information/generalService";
import { useSession } from "next-auth/react";
import { getProfessionalByEmail } from "@/services/sessionService";
/*I want to make a a form that gets the current data that is on the general_info table for an specific professional_info id and that can update that information.
  - Make services based on getting the current data of general_info table based on a professional_info record.
  - Make services based on posting new data to general_info table with an specific professional_info id.
  - Create the component general info:
    * useState for checking the state of the form fields
    * useEffect to make initial fetch of the possible current information
    * handleChange
    * handleSubmit
    * actual html code
*/
const GeneralInfo = () => {
  const { data: session } = useSession();
  const [professionalID, setProfessionalID] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessionalID = async () => {
      if (session?.user?.email) {
        const staticID = await getProfessionalByEmail(session.user.email);
        setProfessionalID(staticID);
      }
    };
    
    fetchProfessionalID();
  }, [session]);


  const [existingGeneralInfo, setExistingGeneralInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    github_link: '',
    linkedin_link: '',
  });

  useEffect(() => {
    const fetchExistingGeneralInfo = async () => {
      try {
        const existingInfo = await getGeneralInfo(professionalID);
        if (existingInfo){
          setExistingGeneralInfo(existingInfo);
        }
      } catch (error) {
        console.error('Error fetching existing general info:', error);
      }
    };
    fetchExistingGeneralInfo();
  }, [professionalID]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGeneralInfo(professionalID, {
        ...existingGeneralInfo
      });
      const existingInfo = await getGeneralInfo(professionalID);
      setExistingGeneralInfo(existingInfo);
    } catch (error) {
      console.error('Error creating general info:', error);
    }
  };

  const handleChange = (e) => {
    setExistingGeneralInfo({
      ...existingGeneralInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-2 > *'>
      <div className="text-5xl text-gptgreen font-koh_santepheap font-bold mb-1">General Info</div>
      <div className='w-full h-0.5 bg-outlinegray rounded-lg my-3'></div>
      {/* Identity */}<>
        <div className="text-4xl font-koh_santepheap font-bold text-primarygray font-bold">Identity</div>
        <p className="text-lg font-inter text-secondarygray text-md">Personal information that will be shown regardless of desired position</p>         
        <div className='flex flex-row'>
          {/* First name */}
          <div className='flex flex-col justify-left pb-4 w-full'>
            <p className='text-primarygray font-semibold font-inter text-s pb-0.5'>First Name</p>
            <label>
              <input
                type="text"
                name="first_name"
                className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                placeholder={existingGeneralInfo.first_name}
                value={existingGeneralInfo.first_name} 
                onChange={handleChange}
              />
            </label>
          </div>
          {/* Spacer */} <div className='w-20'/>
          {/* Last name */}
          <div className='flex flex-col justify-left pb-4 w-full'>
            <p className='text-primarygray font-semibold font-inter text-s pb-0.5'>Last Name</p>
            <label>
              <input
                type="text"
                name="last_name"
                className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                placeholder={existingGeneralInfo.last_name}
                value={existingGeneralInfo.last_name} 
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
      </>
      {/* Contact Information */}<>
      <div className="text-4xl font-koh_santepheap font-bold text-primarygray font-bold pt-4">Contact Information</div>
        <p className="text-lg font-inter text-secondarygray text-md">Personal information that will be shown regardless of desired position</p>         
        <div className='flex flex-row'>
          {/* Email */}
          <div className='flex flex-col justify-left pb-4 w-full'>
            <p className='text-primarygray font-semibold font-inter text-s pb-0.5'>Email</p>
            <label>
              <input
                type="email"
                name="email"
                className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                placeholder={existingGeneralInfo.email}
                value={existingGeneralInfo.email} 
                onChange={handleChange}
              />
            </label>
          </div>
          {/* Spacer */} <div className='w-20'/>
          {/* Phone Number */}
          <div className='flex flex-col justify-left pb-4 w-full'>
            <p className='text-primarygray font-semibold font-inter text-s pb-0.5'>Phone Number</p>
            <label>
              <input
                type="tel"
                name="phone"
                className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                placeholder={existingGeneralInfo.phone}
                value={existingGeneralInfo.phone} 
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
      </>
      {/* Aditional Links */}<>
      <div className="text-4xl font-koh_santepheap font-bold text-primarygray font-bold pt-4">Aditional Links</div>
        <p className="text-lg font-inter text-secondarygray text-md">Personal information that will be shown regardless of desired position</p>         
        <div className='flex flex-row'>
          {/* Github */}
          <div className='flex flex-col justify-left pb-4 w-full'>
            <p className='text-primarygray font-semibold font-inter text-s pb-0.5'>Github</p>
            <label>
              <input
                type="text"
                name="github_link"
                className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                placeholder={existingGeneralInfo.github_link}
                value={existingGeneralInfo.github_link} 
                onChange={handleChange}
              />
            </label>
          </div>
          {/* Spacer */} <div className='w-20'/>
          {/* Linked In */}
          <div className='flex flex-col justify-left pb-4 w-full'>
            <p className='text-primarygray font-semibold font-inter text-s pb-0.5'>Linkedin</p>
            <label>
              <input
                type="text"
                name="linkedin_link"
                className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                placeholder={existingGeneralInfo.linkedin_link}
                value={existingGeneralInfo.linkedin_link} 
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
      </>
      {/* submit */}
      <button type="submit" className='flex items-center justify-center bg-gradient-to-r from-aiblue to-gptgreen felx-row text-white text-md rounded-3xl p-2.5 w-72 delay-50 hover:scale-105 duration-200'>
        Save Info
      </button>  
    </form>
  );
};

export default GeneralInfo;
/*
      <div className="text-5xl text-gptgreen font-koh_santepheap font-bold mb-1">General Info</div>
      <div className='w-full h-0.5 bg-outlinegray rounded-lg'></div>
      {existingGeneralInfo && (
        <div>
          <h3>Existing General Info</h3>
          <p>First Name: {existingGeneralInfo.first_name}</p>
          <p>Last Name: {existingGeneralInfo.last_name}</p>
          <p>Email: {existingGeneralInfo.email}</p>
          <p>Phone: {existingGeneralInfo.phone}</p>
          <p>Github Link: {existingGeneralInfo.github_link}</p>
          <p>LinkedIn Link: {existingGeneralInfo.linkedin_link}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" value={existingGeneralInfo.first_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="last_name" value={existingGeneralInfo.last_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={existingGeneralInfo.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" name="phone" value={existingGeneralInfo.phone} onChange={handleChange} />
        </label>
        <br />
        <label>
          Github Link:
          <input type="text" name="github_link" value={existingGeneralInfo.github_link} onChange={handleChange} />
        </label>
        <br />
        <label>
          LinkedIn Link:
          <input type="text" name="linkedin_link" value={existingGeneralInfo.linkedin_link} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
*/