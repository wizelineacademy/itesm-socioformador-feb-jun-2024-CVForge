import React, { useState, useEffect } from 'react';
import { createGeneralInfo, getGeneralInfo } from "@/services/professional_information/generalService";

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
  const fixedProfessionalId = '2f194e12-92a2-4c91-a27c-d75ff08337b3';

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
        const existingInfo = await getGeneralInfo(fixedProfessionalId);
        if (existingInfo){
          setExistingGeneralInfo(existingInfo);
        }
      } catch (error) {
        console.error('Error fetching existing general info:', error);
      }
    };
    fetchExistingGeneralInfo();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGeneralInfo(fixedProfessionalId, {
        ...existingGeneralInfo
      });
      const existingInfo = await getGeneralInfo(fixedProfessionalId);
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
    <div>
      <h2>Create or Update General Info</h2>
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
    </div>
  );
};

export default GeneralInfo;
