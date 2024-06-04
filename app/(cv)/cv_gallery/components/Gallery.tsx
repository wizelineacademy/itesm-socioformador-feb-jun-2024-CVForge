"use-client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { RxCross2 } from "react-icons/rx";
import NewCv from "./NewCv";
import ExistingCV from "./ExistingCV";

// Services
import {
  getAllCVs,
  createCV,
  findCVById,
  deleteCV,
} from "@/services/cvService";
import { getAllPositions } from "@/services/positionServices";
import {
  getProfessionalByEmail,
  getUserIdByEmail,
} from "@/services/sessionService";
import {
  getEducation,
  getGeneralInfo,
  getProjects,
  getWorks,
} from "@/services/professional_information/generalService";

// Types
import { cv, desired_position } from "@prisma/client";
import { useSession } from "next-auth/react";
import { ProfessionalInfo } from "@/types/professionalInfo";
import GalleryLoading from "@/app/components/loading";

interface GalleryProps {
  searchQuery: string;
}

const Gallery: React.FC<GalleryProps> = ({ searchQuery }) => {
  const { data: session } = useSession();
  const [professionalId, setProfessionalId] = useState<string>("");
  const [professionalInfo, setProfessionalInfo] = useState<ProfessionalInfo>();
  const [canCreateCv, setCanCreateCv] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

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
        const userId = await getUserIdByEmail(session.user.email);
        const cvArray = await getAllCVs(userId);
        setCvs(cvArray);
      } catch (error) {
        console.error("Failed to fetch CVs:", error);
      }
    };

    fetchCvs();
  }, [session]);

  // Get the user professional information
  useEffect(() => {
    const fetchProfessionalID = async () => {
      const professinalInfoId = await getProfessionalByEmail(
        session.user.email
      );
      if (professinalInfoId) setProfessionalId(professinalInfoId);
    };

    if (session?.user?.email) fetchProfessionalID();
  }, [session?.user?.email]);

  //Fetching all Positions Information
  const fetchPositions = async () => {
    try {
      const positionsArray = await getAllPositions();

      setPositions(positionsArray);
    } catch (error) {
      console.error("Failed to fetch Positions:", error);
    }
  };

  // Get the users professional info details
  async function fetchProfessionalDetails(professionalId: string) {
    try {
      const responses = await Promise.all([
        getGeneralInfo(professionalId),
        getEducation(professionalId),
        getProjects(professionalId),
        getWorks(professionalId),
      ]);

      const [generalInfo, education, projects, works] = responses;

      // Convert date objects to strings
      const formattedEducation = education.map((edu) => ({
        ...edu,
        start_date: edu.start_date ? format(edu.start_date, "dd/MM/yyyy") : "",
        end_date: edu.end_date ? format(edu.end_date, "dd/MM/yyyy") : "",
      }));

      const formattedProjects = projects.map((proj) => ({
        ...proj,
        start_date: proj.start_date
          ? format(proj.start_date, "dd/MM/yyyy")
          : "",
        end_date: proj.end_date ? format(proj.end_date, "dd/MM/yyyy") : "",
      }));

      const formattedWorks = works.map((work) => ({
        ...work,
        start_date: work.start_date
          ? format(work.start_date, "dd/MM/yyyy")
          : "",
        end_date: work.end_date ? format(work.end_date, "dd/MM/yyyy") : "",
      }));
      setProfessionalInfo({
        generalInfo: generalInfo || undefined,
        education: formattedEducation,
        project: formattedProjects,
        work: formattedWorks,
      });
    } catch (error) {
      console.error("Error fetching professional info:", error);
    }
  }

  // Use effect to get the data neded to create a new cv
  useEffect(() => {
    // Check if there is information

    if (professionalId) {
      fetchPositions();
      fetchProfessionalDetails(professionalId);
    }
  }, [professionalId]);

  useEffect(() => {
    if (professionalInfo) {
      const isValid =
        professionalInfo.education &&
        professionalInfo.education.length > 0 &&
        professionalInfo.project &&
        professionalInfo.project.length > 0 &&
        professionalInfo.work &&
        professionalInfo.work.length > 0;
      setCanCreateCv(isValid);
    }
  }, [professionalInfo]);

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
  };

  const callApi = async (cvId: string) => {
    const selectedPositionTitle = positions.find(
      (position) => position.desired_position_id == selectedPosition
    ).title;
    try {
      const response = await fetch("/api/createCv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvId: cvId,
          professionalInfo: JSON.stringify(professionalInfo),
          selectedPosition: selectedPositionTitle,
        }),
      });

      if (response.ok) {
        const jsonData = await response.json();
        console.log("Message: ", jsonData.message);
      } else {
        console.error("Failed to fetch CV data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching CV data:", error);
    }
  };

  const handleCreateCv = async (event: React.FormEvent) => {
    setTimeout(() => {
      setIsLoading(true); 
    }, 500);
    event.preventDefault();
    try {
      if (selectedPosition) {
        const userId = await getUserIdByEmail(session.user.email);
        const newCv = await createCV({
          user_id: userId,
          title: title,
          desired_position_id: selectedPosition,
        });

        setCvs((cvs) => [...cvs, newCv]);
        setIsFormVisible(false);
        setTitle("");
        setSelectedPosition("");
        // Get the cv content from the ai api
        callApi(newCv.cv_id);
        // Handle successful form submission (e.g., close form, reset form)
      } else {
        console.error("No position selected. Please choose a position.");
      }
    } catch (error) {
      console.error("Failed to create new CV:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false); 
      }, 4000);
    }
  };

  const handleCVDelete = async (cvId: string) => {
    const deletedCV = await deleteCV(cvId);
    setIsDetailVisible(false);
    setCvs((prevCvs) => prevCvs.filter((cv) => cv.cv_id !== cvId));
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
      {cvs.filter(cv => cv.title.toLowerCase().includes(searchQuery)).map((cv, index) => (
        <ExistingCV key={index} cvProp={cv} deleteFunction={handleCVDelete} />
      ))}
      {isLoading && (
      <div className="absolute w-screen h-screen top-0 left-0 bg-primarygray bg-opacity-50 flex justify-center items-center z-10">
        <GalleryLoading />
      </div>
      )}
    </div>

      {/*pop up to create new*/}
      {isFormVisible && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-primarygray flex justify-center items-center z-10 bg-opacity-50">
          {/* Pop Up White Box */}
          <div className="bg-white px-2 rounded-md shadow-md flex flex-col">
            {/* Top */}
            <div className="flex flex-row p-2 justify-center items-center">
              <button
                type="button"
                onClick={handleFormToggle}
                className="text-2xl text-secondarygray hover:text-opacity-100 text-opacity-50"
              >
                <RxCross2 />
              </button>
              <h1 className="text-primarygray font-koh_santepheap font-bold text-3xl mx-auto">
                New CV
              </h1>
            </div>
            {/* Middle */}
            {canCreateCv ? (
              <form onSubmit={handleCreateCv}>
                <div className="px-6">
                  <div className="h-0.5 rounded bg-secondarygray w-auto bg-opacity-30" />
                  <div className="p-4">
                    <div className="px-5 py-2">
                      <div className="flex flex-col justify-left">
                        <p className="text-primarygray font-semibold font-inter text-md pb-0.5">
                          CV Title
                        </p>
                        <input
                          type="text"
                          placeholder="New CV Title"
                          value={title}
                          className="border-2 border-gptgreen bg-white h-10 px-3 pr-60 rounded-lg text-md focus:outline-none"
                          onChange={handleTitleChange}
                          required
                        />
                      </div>
                      <div className="p-3" />
                      <p className="text-primarygray font-semibold font-inter text-md pb-0.5">
                        Position to Apply
                      </p>
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
                            <option
                              key={index}
                              value={position.desired_position_id}
                            >
                              {position.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="h-0.5 rounded bg-secondarygray w-auto bg-opacity-30" />
                </div>
                {/* Bottom */}
                <button
                  type="submit"
                  className="flex items-center justify-center bg-gradient-to-r from-aiblue to-gptgreen felx-row text-white text-md rounded-3xl p-2.5 w-60 shadow-sm mx-auto my-4 delay-50 hover:scale-105 duration-200"
                >
                  Create
                </button>
              </form>
            ) : (
              <p className="p-4">
                Please fill out the information needed in the editor
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

