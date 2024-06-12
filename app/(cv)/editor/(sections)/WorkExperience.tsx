<<<<<<< HEAD
'use client'
import React from 'react'
=======
"use client";
import React from "react";
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
import {
  getWorks,
  createWork,
  updateWork,
  deleteWork,
<<<<<<< HEAD
} from '@/services/professional_information/generalService'
import { useEffect, useState } from 'react'
import { update } from 'cypress/types/lodash'
import { useSession } from 'next-auth/react'
import { getProfessionalByEmail } from '@/services/sessionService'
import { MdOutlineModeEdit } from 'react-icons/md'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { Prisma } from '@prisma/client'

interface Work {
  work_experience_id: string
  work_position: string
  description: string
  start_date: Date
  end_date: Date
}

interface WorkProps {
  works: Work[]
  setWorks: React.Dispatch<React.SetStateAction<Work[]>>
  professionalID: string | null
=======
} from "@/services/professional_information/generalService";
import { useEffect, useState } from "react";
import { update } from "cypress/types/lodash";
import { useSession } from "next-auth/react";
import { getProfessionalByEmail } from "@/services/sessionService";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Prisma } from "@prisma/client";

interface Work {
  work_experience_id: string;
  work_position: string;
  description: string;
  start_date: Date;
  end_date: Date;
}

interface WorkProps {
  works: Work[];
  setWorks: React.Dispatch<React.SetStateAction<Work[]>>;
  professionalID: string | null;
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
}

const WorkExperience: React.FC<WorkProps> = ({
  works,
  setWorks,
  professionalID,
}) => {
<<<<<<< HEAD
  const [editingCardId, setEditingCardId] = useState<string | null>(null)
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)
=======
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

  const toggleEditMode = (cardId: string) => {
    setTimeout(() => {
      if (editingCardId === cardId) {
        setEditingCardId(null)
      } else {
<<<<<<< HEAD
        setEditingCardId(cardId)
=======
        setEditingCardId(cardId);
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
      }
    }, 200)
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    workID: string,
    work: Work,
  ) => {
<<<<<<< HEAD
    event.preventDefault()
=======
    event.preventDefault();
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

    const formData = new FormData(event.currentTarget)
    const workData: Partial<Work> = {
<<<<<<< HEAD
      work_position: formData.get('work_position') as string,
      description: formData.get('description') as string,
      start_date: formData.get('start_date')
        ? new Date(formData.get('start_date') as string)
        : undefined,
      end_date: formData.get('end_date')
        ? new Date(formData.get('end_date') as string)
        : undefined,
    }
    console.log
    if (
      workData.description.trim() == '' ||
      !workData.start_date ||
      workData.work_position.trim() == ''
    ) {
      alert('Title, Description, and Start Date must be filled in to save.')
    } else {
      try {
        const updatedWork = await updateWork(workID, workData)
        console.log('Work updated successfully:', updatedWork)
=======
      work_position: formData.get("work_position") as string,
      description: formData.get("description") as string,
      start_date: formData.get("start_date")
        ? new Date(formData.get("start_date") as string)
        : undefined,
      end_date: formData.get("end_date")
        ? new Date(formData.get("end_date") as string)
        : undefined,
    };
    console.log;
    if (
      workData.description.trim() == "" ||
      !workData.start_date ||
      workData.work_position.trim() == ""
    ) {
      alert("Title, Description, and Start Date must be filled in to save.");
    } else {
      try {
        const updatedWork = await updateWork(workID, workData);
        console.log("Work updated successfully:", updatedWork);
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
        setWorks((prevWorks) =>
          prevWorks.map((work) =>
            work.work_experience_id === workID ? updatedWork : work,
          ),
<<<<<<< HEAD
        )
        toggleEditMode(work.work_experience_id)
      } catch (error) {
        console.error('Error updating work:', error)
      }
    }
  }

  const handleDelete = async (workID: string, index: number) => {
    try {
      await deleteWork(workID)
      console.log('Work deleted successfully')
      setWorks((prevWorks) => prevWorks.filter((_, idx) => idx !== index))
    } catch (error) {
      console.error('Error deleting work:', error)
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        setWorks((prevWorks) =>
          prevWorks.filter((work) => work.work_experience_id !== workID),
        )
=======
        );
        toggleEditMode(work.work_experience_id);
      } catch (error) {
        console.error("Error updating work:", error);
      }
    }
  };

  const handleDelete = async (workID: string, index: number) => {
    try {
      await deleteWork(workID);
      console.log("Work deleted successfully");
      setWorks((prevWorks) => prevWorks.filter((_, idx) => idx !== index));
    } catch (error) {
      console.error("Error deleting work:", error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        setWorks((prevWorks) =>
          prevWorks.filter((work) => work.work_experience_id !== workID),
        );
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
      }
    }
  }

  const handleCreation = async (ProfessionalID: string) => {
<<<<<<< HEAD
    const workCreated = await createWork(ProfessionalID)
    setWorks((prevWorks) => [...prevWorks, workCreated])
    setEditingCardId(workCreated.work_experience_id)
  }
=======
    const workCreated = await createWork(ProfessionalID);
    setWorks((prevWorks) => [...prevWorks, workCreated]);
    setEditingCardId(workCreated.work_experience_id);
  };
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

  return (
    <div className="w-full h-full overflow-y-auto">
      <h1 className="text-5xl text-gptgreen font-koh_santepheap font-bold mb-1">
        Work Experience
      </h1>
      <div className="w-full h-0.5 bg-outlinegray rounded-lg mt-3"></div>
      {works.map((work, index) => (
        <div
          onMouseEnter={() => setHoveredCardId(work.work_experience_id)}
          onMouseLeave={() => setHoveredCardId(null)}
          key={work.work_experience_id}
        >
          {editingCardId === work.work_experience_id ? (
            <form
              className={`flex flex-col bg-outlinegray bg-opacity-20 border border-2 border-outlinegray shadow-lg rounded-lg p-4 my-4 mt-6`}
              onSubmit={(event) =>
                handleSubmit(event, work.work_experience_id, work)
              }
            >
              <div className="flex flex-row w-full">
                {/* Position */}
                <div className="w-full">
                  <p className="text-primarygray font-semibold font-inter text-xs pb-0.5">
                    Title
                  </p>
                  <label>
                    <input
                      type="text"
                      name="work_position"
                      className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                      defaultValue={work.work_position || ''}
                      placeholder="Title"
                    />
                  </label>
                </div>
                {/* Spacer */} <div className="w-40" />
                {/* Start Date */}
                <div className="w-auto">
                  <p className="text-primarygray font-semibold font-inter text-xs pb-0.5">
                    From
                  </p>
                  <label>
                    <input
                      type="date"
                      name="start_date"
                      className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                      defaultValue={
                        work.start_date
<<<<<<< HEAD
                          ? work.start_date.toISOString().split('T')[0]
                          : ''
=======
                          ? work.start_date.toISOString().split("T")[0]
                          : ""
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
                      }
                      placeholder="Start Date: "
                    />
                  </label>
                </div>
                <p className="text-primarygray font-semibold font-inter text-s pt-[10px] m-4">
                  -
                </p>
                {/* End Date */}
                <div className="w-auto">
                  <p className="text-primarygray font-semibold font-inter text-xs pb-0.5">
                    To
                  </p>
                  <label>
                    <input
                      type="date"
                      name="end_date"
                      className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                      defaultValue={
                        work.end_date
<<<<<<< HEAD
                          ? work.end_date.toISOString().split('T')[0]
                          : ''
=======
                          ? work.end_date.toISOString().split("T")[0]
                          : ""
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
                      }
                      placeholder="End Date: "
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-row w-full text-secondarygray ">
                {/* Description */}
                <div className="w-full">
                  <p className="text-primarygray font-semibold font-inter text-xs pb-0.5">
                    Description
                  </p>
                  <label>
                    <input
                      type="text"
                      name="description"
                      className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                      defaultValue={work.description || ''}
                      placeholder="Description: "
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-row w-full mt-3">
                <button
                  className="flex items-center justify-center bg-gradient-to-r from-aiblue to-gptgreen felx-row text-white text-md rounded-3xl p-2 px-12 w-auto delay-50 hover:scale-105 duration-200 mr-auto"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="h-auto mr-4 rounded-lg text-xl text-secondarygray hover:text-primarygray"
                  onClick={() => handleDelete(work.work_experience_id, index)}
                >
                  <MdOutlineDeleteOutline />
                </button>
              </div>
            </form>
          ) : (
            <div
              className={`flex flex-col border border-2 border-outlinegray hover:border-gptgreen hover:shadow-lg rounded-lg p-4 my-4 mt-6 text-secondarygray`}
            >
              <div className="flex flex-row">
                <h1 className="text-primarygray mr-auto">
                  {work.work_position}
                </h1>
                {editingCardId === work.work_experience_id ||
                hoveredCardId === work.work_experience_id ? (
                  <button
                    className="h-auto mr-4 rounded-lg text-xl"
                    onClick={() => toggleEditMode(work.work_experience_id)}
                  >
                    <MdOutlineModeEdit />
                  </button>
                ) : null}
              </div>
              <p>
<<<<<<< HEAD
                {work.start_date ? work.start_date.toLocaleDateString() : 'xxx'}{' '}
                {work.end_date
                  ? ` - ${work.end_date.toLocaleDateString()}`
                  : ' '}
=======
                {work.start_date ? work.start_date.toLocaleDateString() : "xxx"}{" "}
                {work.end_date
                  ? ` - ${work.end_date.toLocaleDateString()}`
                  : " "}
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
              </p>
              <p>{work.description}</p>
            </div>
          )}
        </div>
      ))}
      <div className="w-full justify-center">
        <button
          onClick={() => handleCreation(professionalID)}
          className="flex flex-row items-center justify-center text-outlinegray hover:text-secondarygray text-md p-2"
        >
          <p className="text-4xl">+</p>
          <p className="m-2 ">Add New Work Experience</p>
        </button>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default WorkExperience
=======
export default WorkExperience;
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
