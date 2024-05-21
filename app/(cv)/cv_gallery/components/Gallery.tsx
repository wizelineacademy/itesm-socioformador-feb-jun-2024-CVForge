"use-client";
import React from "react";
import NewCv from "./NewCv";
import ExistingCV from "./ExistingCV";
import { getAllCVs, createCV, findCVById, deleteCV } from "@/services/cvService";
import { useEffect, useState } from "react";
import { getAllPositions } from "@/services/positionServices";
import { cv, desired_position } from "@prisma/client";
import { RxCross2 } from "react-icons/rx";
import GalleryLoading from "../../../components/loading";

import { useSession } from "next-auth/react";

const Gallery: React.FC = () => {
  const { data: session } = useSession();

  //useState for CV
  const [cvs, setCvs] = useState<cv[]>([]);
  const [title, setTitle] = useState<string>("");
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
        const userEmail = session?.user?.email;

        const user = await prisma.users.findFirst({
          where: { email: userEmail },
        });

        const cvArray = await getAllCVs(user.users_id);

        setCvs(cvArray);
      } catch (error) {
        console.error("Failed to fetch CVs:", error);
      } 
    };

    fetchCvs();
  }, [session]);

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
        const newCv = await createCV({
          title: title,
          desired_position_id: selectedPosition,
        });
        
        setCvs((cvs) => [...cvs, newCv]);
        setIsFormVisible(false);
        setTitle("");
        setSelectedPosition("");
        
        // Handle successful form submission (e.g., close form, reset form)
      } else {
        console.error("No position selected. Please choose a position.");
      }
    } catch (error) {
      console.error("Failed to create new CV:", error);
    }
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

  if (session && session.user) {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-2 overflow-y-auto top-0">
        <NewCv handleFormToggle={handleFormToggle} />
        {cvs.map((cv, index) => (
          <ExistingCV
          key={index}
          cvProp={cv}
          deleteFunction={handleCVDelete}
          />
        ))}
      </div>
    
      {/*pop up to create new*/}
      {isFormVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center">
          {/* Pop Up White Box */}
          <div className="bg-white px-2 rounded-md shadow-md flex flex-col">
            {/* Top */}
            <div className="flex flex-row p-2 justify-center items-center">
            <button type="button" onClick={handleFormToggle} className="text-2xl text-secondarygray hover:text-opacity-100 text-opacity-50">
              <RxCross2 />
            </button>
            <h1 className="text-primarygray font-koh_santepheap font-bold text-3xl mx-auto">New CV</h1>
          </div>
          {/* Middle */}
          <form onSubmit={handleFormSubmit}>
            <div className="px-6">
              <div className="h-0.5 rounded bg-secondarygray w-auto bg-opacity-30"/>
              <div className="p-4">
                <div className="px-5 py-2">
                  <div className='flex flex-col justify-left'>
                    <p className='text-primarygray font-semibold font-inter text-md pb-0.5'>CV Title</p>
                    <input
                      type="text"
                      placeholder="New CV Title"
                      value={title}
                      className="border-2 border-gptgreen bg-white h-10 px-3 pr-60 rounded-lg text-md focus:outline-none"
                      onChange={handleTitleChange}
                      required
                    />
                  </div>
                  <div className="p-3"/>
                  <p className='text-primarygray font-semibold font-inter text-md pb-0.5'>Position to Apply</p>
                  <div className="form-group">
                    <select
                      id="position"
                      value={selectedPosition}
                      onChange={handlePositionChange}
                      className="border-2 border-secondarygray border-opacity-50 text-secondarygray bg-white h-10 px-3 pr-32 rounded-lg text-md focus:outline-none mb-1"
                      required
                    >
                      <option value="" disabled>
                        Select a position
                      </option>
                      {positions.map((position, index) => (
                        <option key={index} value={position.desired_position_id}>
                        {position.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="h-0.5 rounded bg-secondarygray w-auto bg-opacity-30"/>
            </div>
            {/* Bottom */}
            <button type="submit" className='flex items-center justify-center bg-gradient-to-r from-aiblue to-gptgreen felx-row text-white text-md rounded-3xl p-2.5 w-60 shadow-sm mx-auto my-4 delay-50 hover:scale-105 duration-200'>
              Create
            </button>
          </form>
      </div>
      </div>
    )}
    </div>
  );
} else {
  return (
    <GalleryLoading />
  )
}
};

export default Gallery;
