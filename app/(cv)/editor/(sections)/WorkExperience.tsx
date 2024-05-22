"use client"
import React from "react";
import {getWorks, createWork, updateWork, deleteWork} from "@/services/professional_information/generalService";
import { useEffect, useState} from "react";
import { update } from "cypress/types/lodash";
import { useSession } from "next-auth/react";
import { getProfessionalByEmail } from "@/services/sessionService";

interface Work {
  work_experience_id : string;
  work_position : string;
  description : string;
  start_date : Date;
  end_date : Date;
}

const WorkExperience: React.FC = () => {
  const { data: session } = useSession();
  const [professionalID, setProfessionalID] = useState<string | null>(null);
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    const fetchProfessionalID = async () => {
      if (session?.user?.email) {
        const staticID = await getProfessionalByEmail(session.user.email);
        setProfessionalID(staticID);
      }
    };
    
    fetchProfessionalID();
  }, [session]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const worksGetted = await getWorks(professionalID);
        setWorks(worksGetted);
      }
      catch (error) {
        console.log("There was an error trying to fetch the works", error)
      }
    }
    fetchWorks();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, workID: string) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const workData: Partial<Work> = {
      work_position: formData.get("work_position") as string,
      description: formData.get("description") as string,
      start_date: formData.get("start_date") ? new Date(formData.get("start_date") as string) : undefined,
      end_date: formData.get("end_date") ? new Date(formData.get("end_date") as string) : undefined,
    };

    try {
      const updatedWork = await updateWork(workID, workData);
      console.log('Work updated successfully:', updatedWork);
      setWorks((prevWorks) =>
      prevWorks.map((work) =>
      work.work_experience_id === workID ? updatedWork : work
        )
      );
    } catch (error) {
      console.error('Error updating work:', error);
    }
  };

  const handleDelete = async (workID: string, index: number) => {
    try {
      await deleteWork(workID);
      console.log('Work deleted successfully');
      setWorks((prevWorks) =>
      prevWorks.filter((_, idx) => idx !== index)
      );
    }catch (error) {
      console.error('Error deleting work:', error);
      if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        // Optionally remove the record from the state if it does not exist in the database
        setWorks((prevWorks) =>
        prevWorks.filter((work) => work.work_experience_id !== workID)
        );
      }
    }
  };

  const handleCreation = async (ProfessionalID : string) => {
    const workCreated = await createWork(ProfessionalID);
    setWorks((prevWorks) => [...prevWorks, workCreated]);
  }

  return (
    <div>
      <div className="text-5xl text-gptgreen font-koh_santepheap font-bold mb-1">Work Experience</div>
      <div className='w-full h-0.5 bg-outlinegray rounded-lg mt-3'></div>
      {works.map((work, index) => (
        <div className='flex flex-col border border-outlinegray border-2 hover:border-editorgray hover:shadow-lg hover:bg-editorgray rounded-lg p-4 my-4 mt-6' key={work.work_experience_id}>
          <form onSubmit={(event) => handleSubmit(event, work.work_experience_id)}>
            <div className="flex flex-row w-full">
              {/* Position */}
              <div className="w-full">
                <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>Title</p>
                <label>
                  <input
                    type="text"
                    name="work_position"
                    className="border-2 border-outlinegray bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                    defaultValue={work.work_position || ""}
                    placeholder="Title"
                  />
                </label>
              </div>
              {/* Spacer */} <div className='w-40'/>
              {/* Start Date */}
              <div className="w-auto">
                <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>From</p>
                <label>
                  <input
                    type="date"
                    name="start_date"
                    className="border-2 border-outlinegray bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                    defaultValue={work.start_date ? work.start_date.toISOString().split("T")[0] : ""}
                    placeholder="Start Date: "
                  />
                </label>
              </div>
              <p className='text-primarygray font-semibold font-inter text-s pt-[10px] m-4'>-</p>
              {/* End Date */}
              <div className="w-auto">
                <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>To</p>
                <label>
                <input
                  type="date"
                  name="end_date"
                  className="border-2 border-outlinegray bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                  defaultValue={work.end_date ? work.end_date.toISOString().split("T")[0] : ""}
                  placeholder="End Date: "
                />
              </label>
              </div>
            </div>
            <div className="flex flex-row w-full text-secondarygray">
              {/* Description */}
              <div className="w-full">
                <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>Description</p>
                <label>
                  <input
                    type="text"
                    name="description"
                    className="border-2 border-outlinegray bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                    defaultValue={work.description || ""}
                    placeholder="Description: "
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-row w-full mt-3">
              <button className="border-2 border-outlinegray bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-auto" 
                type="submit">Add</button>
              <button className="border-2 border-outlinegray bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-auto" 
                onClick={() => handleDelete(work.work_experience_id, index)}>Delete</button>
            </div>
          </form>
        </div>
      ))}
      <div className="w-full justify-center">
        <button onClick={() => handleCreation(staticID)} className='flex flex-row items-center justify-center text-outlinegray hover:text-secondarygray text-md'>
           <p className='text-4xl'>+</p>
           <p className="m-2 mt-[14px]">Add Work Experience</p>
        </button>  
      </div>
    </div>
  )
}

export default WorkExperience;