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
      {works.map((work, index) => (
        <div key={work.work_experience_id}>
          <h1>Work #{index + 1}</h1>
          <form onSubmit={(event) => handleSubmit(event, work.work_experience_id)}>
            <label>
              <input
                type="text"
                name="work_position"
                defaultValue={work.work_position || ""}
                placeholder="Position:: "
              />
            </label>
            <label>
              <input
                type="text"
                name="description"
                defaultValue={work.description || ""}
                placeholder="Description: "
              />
            </label>
            <label>
              <input
                type="date"
                name="start_date"
                defaultValue={work.start_date ? work.start_date.toISOString().split("T")[0] : ""}
                placeholder="Start Date: "
              />
            </label>
            <label>
              <input
                type="date"
                name="end_date"
                defaultValue={work.end_date ? work.end_date.toISOString().split("T")[0] : ""}
                placeholder="End Date: "
              />
            </label>
            <button type="submit">Save</button>
          </form>
          <button onClick={() => handleDelete(work.work_experience_id, index)}>Delete</button>
        </div>
      ))}
      <button onClick={() => handleCreation(professionalID)}>Create New Work</button>
    </div>
  )
}

export default WorkExperience;