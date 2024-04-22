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

  return (
    <div className="flex flex-row items-center min-h-screen bg-editorgray py-10 pt-32">
      <div className="grid grid-cols-5 gap-10 overflow-y-auto">
        <NewCv/>
        {cvs.map((cv, index) => (
          <ExistingCV key={index} title={cv.cv_id} />
        ))}
      </div>
    </div>
  );
};


export default Gallery;
