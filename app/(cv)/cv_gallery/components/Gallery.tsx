"use-client";
import React from "react";
import NewCv from "./NewCv";
import ExistingCV from "./ExistingCV";
import { getAllCVs, createCV, findCVById, deleteCV } from "@/services/cvService";
import { useEffect, useState } from "react";
import { getAllPositions } from "@/services/positionServices";
import { cv, desired_position } from "@prisma/client";

const Gallery: React.FC = () => {
  //useState for CV
  const [cvs, setCvs] = useState<cv[]>([{ cv_id: "123", desired_position_id: "123", title: "Google Internship", user_id: "123" },
  { cv_id: "123", desired_position_id: "123", title: "Meta Internship", user_id: "123" },
  { cv_id: "123", desired_position_id: "123", title: "Microsoft Internship", user_id: "123" }
  ]);
  const [title, setTitle] = useState<string>("");
  //useState for positions
  const [positions, setPositions] = useState<desired_position[]>([
    { desired_position_id: "123", title: "Internship", years_experience: 1, company: "Google", description: "Google internship" },
    { desired_position_id: "124", title: "Senior Developer", years_experience: 5, company: "Facebook", description: "Lead developer role focusing on React applications." },
    { desired_position_id: "125", title: "Data Scientist", years_experience: 3, company: "Amazon", description: "Data scientist position requiring expertise in big data and machine learning." },
    { desired_position_id: "126", title: "Product Manager", years_experience: 4, company: "Apple", description: "Oversee the development of new tech products from concept to launch." },
    { desired_position_id: "127", title: "UX/UI Designer", years_experience: 2, company: "Adobe", description: "Designing intuitive user interfaces for mobile and web applications." },]);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  //useState for CV creation pop-up
  const [isFormVisible, setIsFormVisible] = useState(false);
  //useState for CV previsualization pop-up
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [selectedCv, setSelectedCV] = useState<cv | null>(null);

  //Fetching all CV information
  // useEffect(() => {
  //   const fetchCvs = async () => {
  //     try {
  //       const cvArray = await getAllCVs();

  //       setCvs(cvArray);
  //     } catch (error) {
  //       console.error("Failed to fetch CVs:", error);
  //     }
  //   };

  //   fetchCvs();
  // }, []);

  //Fetching all Positions Information
  // useEffect(() => {
  //   const fetchPositions = async () => {
  //     try {
  //       const positionsArray = await getAllPositions();

  //       setPositions(positionsArray);
  //     } catch (error) {
  //       console.error("Failed to fetch Positions:", error);
  //     }
  //   };

  //   fetchPositions();
  // }, []);

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // Prevent the default form submission behavior

    const newCV = {
      cv_id: `cv${Math.random().toString(16).slice(2)}`,  // Generate a pseudo-random ID for the CV
      desired_position_id: selectedPosition,
      title: title,
      user_id: "user" + (cvs.length + 1)  // Generate a simple user ID
    };

    // Set the new CV as the first object in the list
    setCvs([newCV, ...cvs]);  // Update the CVs array by adding the new CV at the start

    setTitle('');  // Reset the title state
    setSelectedPosition('');  // Reset the selected position state
    handleFormToggle();  // Close the form
};


  const handleCVDelete = async (cvId: string) => {
    const deletedCV = await deleteCV(cvId);
    setIsDetailVisible(false);
    setCvs((prevCvs) => prevCvs.filter(cv => cv.cv_id !== cvId));
    console.log("cv deleted");
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
    <div className="min-h-screen bg-transparent">
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-2 overflow-y-auto top-0">
        <NewCv handleFormToggle={handleFormToggle} />
        {cvs.map((cv, index) => (
          <ExistingCV key={index} cvProp={cv} deleteFunction={() => handleCVDelete(cv.cv_id)} />
        ))}
      </div>
      {isFormVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2>Create New CV</h2>
            <form className="mt-10" onSubmit={handleFormSubmit}>
              <input className="w-full px-2" type="text" placeholder="New CV Title" value={title} onChange={handleTitleChange} required />
              <div className="form-group mt-6">
                <label htmlFor="position" className="mr-2">Select a position:</label>
                <select id="position" value={selectedPosition} onChange={handlePositionChange} required>
                  <option value="" disabled>Choose a position</option>
                  {positions.map((position, index) => (
                    <option key={index} value={position.desired_position_id}>{position.title}</option>
                  ))}
                </select>
              </div>
              <div className="w-full flex justify-between mt-4">
                <button className="rounded-md border border-secondarygray p-2 hover:bg-secondarygray hover:text-white" type="submit">Create</button>
                <button className="rounded-md border border-secondarygray p-2 hover:bg-secondarygray hover:text-white" type="button" onClick={handleFormToggle}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
/*
  //Deleting a CV
  const handleCVDelete = async(cvId: string) => {
    const deletedCV = await deleteCV(cvId);
    setIsDetailVisible(false);
    setCvs((prevCvs) => prevCvs.filter(cv => cv.cv_id !== cvId));
    console.log("cv deleted");
  };

  //Fecthing CV individual information
  const handleCVSelection = async (cvId: string) => {
    const cvSelected = await findCVById(cvId);
    setSelectedCV(cvSelected);
    setIsDetailVisible(true);
  };
*/