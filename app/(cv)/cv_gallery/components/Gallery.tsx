"use-client";
import React from "react";
import NewCv from "./NewCv";
import ExistingCV from "./ExistingCV";
import { getAllCVs, createCV, findCVById} from "@/services/cvService";
import { useEffect, useState } from "react";
import { getAllPositions } from "@/services/positionServices";
import {cv, desired_position} from "@prisma/client"

interface Cv {
  cv_id: string;
  title: string;
}

interface CvDetail extends Cv {
  desired_position_id: string;
}

interface Position {
  title: string;
  desired_position_id: string;
}

const Gallery: React.FC = () => {
  //useState for CV
  const [cvs, setCvs] = useState<cv[]>([]); 
  const [title, setTitle] = useState<string>('');
  //useState for positions
  const [positions, setPositions] = useState<desired_position[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  //useState for CV creation pop-up
  const [isFormVisible, setIsFormVisible] = useState(false);
  //useState for CV previsualization pop-up
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [selectedCv, setSelectedCV] = useState<cv | null>(null);


  //Fetching all CV information
  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const cvArray = await getAllCVs();

        setCvs(cvArray);
      } catch (error) {
        console.error("Failed to fetch CVs:", error);
      }
    };

    fetchCvs();
  }, []);

  //Fecthing CV individual information
  const handleCVSelection = async (cvId: string) => {
    const cvSelected = await findCVById(cvId);
    setIsDetailVisible(true);
    setSelectedCV(cvSelected);
  }

  //Fetching all Positions Information
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const positionsArray = await getAllPositions(); 

        setPositions(positionsArray);
      } catch (error) {
        console.error("Failed to fetch Positions:", error);
      }
    };

    fetchPositions();
  }, []);

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
  };

  
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        if (selectedPosition) {
           const newCv =  await createCV({
                title: title,
                desired_position_id: selectedPosition,
            });
   
            setCvs((cvs) => [...cvs, newCv])
            setIsFormVisible(false);
            setTitle('');
            setSelectedPosition('');
            
            // Handle successful form submission (e.g., close form, reset form)
        } else {
            console.error('No position selected. Please choose a position.');
        }
    } catch (error) {
        console.error('Failed to create new CV:', error);
    }
};


  const handlePositionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPosition(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  

  return (
    <div className="flex flex-row items-center min-h-screen bg-transparent py-10 pt-32">
      <div className="grid grid-cols-5 gap-10 overflow-y-auto">
        <NewCv handleFormToggle={handleFormToggle} />
        {cvs.map((cv, index) => (
          <ExistingCV key={index} cvProp={cv} />
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
                value={title}
                onChange={handleTitleChange}
                required
                // Add more form fields as needed
              />
              <div className="form-group">
                <label htmlFor="position">Select a position:</label>
                <select
                  id="position"
                  value={selectedPosition}
                  onChange={handlePositionChange}
                  required
                >
                  <option value="" disabled>
                    Choose a position
                  </option>
                  {positions.map((position, index) => (
                    <option key={index} value={position.desired_position_id}>
                      {position.title}
                    </option>
                  ))}
                </select>
              </div>
              {/* Example submit button */}
              <button type="submit">Create</button>
              {/* Button to close the form */}
              <button type="button" onClick={handleFormToggle}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
