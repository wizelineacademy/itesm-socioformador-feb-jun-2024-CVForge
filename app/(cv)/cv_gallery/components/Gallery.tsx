"use-client"
import React from 'react';
import NewCv from './NewCv';
import ExistingCV from './ExistingCV';
import {getAllCVs} from "@/services/cvService";
import { useEffect, useState } from 'react';

interface Cv {
  cv_id: string; 
}

const Gallery: React.FC = () => {
  // Define state to hold the CV data
  const [cvs, setCvs] = useState<Cv[]>([]); // Specify the type for the state variable

  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch CVs when the component mounts
  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const cvArray = await getAllCVs(); // Call the endpoint

        // Set the cvs state with the response array
        setCvs(cvArray);
      } catch (error) {
        console.error('Failed to fetch CVs:', error);
      }
    };

    fetchCvs();
  }, []);

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleFormSubmit = async (formData: any) => {
    // Implement form submission logic here
    console.log('Form submitted:', formData);
    // Update your state after form submission
    // E.g., fetch updated CVs
    setIsFormVisible(false);
  };

  return (
    <div className="flex flex-row items-center min-h-screen bg-editorgray py-10 pt-32">
      <div className="grid grid-cols-5 gap-10 overflow-y-auto">
        <NewCv handleFormToggle={handleFormToggle} />
        {cvs.map((cv, index) => (
          <ExistingCV key={index} title={cv.cv_id} />
        ))}
      </div>

      {isFormVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2>Create New CV</h2>
            {/* Add your form component here */}
            {/* Replace the example form with your actual form */}
            <form onSubmit={handleFormSubmit}>
              {/* Example form input */}
              <input
                type="text"
                placeholder="New CV Title"
                required
                // Add more form fields as needed
              />
              {/* Example submit button */}
              <button type="submit">Create</button>
              {/* Button to close the form */}
              <button type="button" onClick={handleFormToggle}>Cancel</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};


export default Gallery;
