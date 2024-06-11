"use client"
import React from "react";
import {useEffect, useState} from "react";
import {createEducation, getEducation, updateEducation, deleteEducation} from "@/services/professional_information/generalService";
import ProfessionalInfo from "../page";
import { useSession } from "next-auth/react";
import { getProfessionalByEmail } from "@/services/sessionService";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface Education {
  education_id: string;
  school: string;
  education_degree: string;
  gpa: number;
  start_date: Date;
  end_date: Date;
  relevant_coursework: string;
}

interface EducationProps {
  educations: Education[];
  setEducations: React.Dispatch<React.SetStateAction<Education[]>>;
  professionalID: string | null;
}

const EducationComponent: React.FC<EducationProps> = ({ educations, setEducations, professionalID }) => {
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const toggleEditMode = (cardId: string) => {
    setTimeout(() => {
      if (editingCardId === cardId) {
        setEditingCardId(null);
      } else {
        setEditingCardId(cardId); 
      }
    }, 200);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, educationID: string, education: Education) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const educationData: Partial<Education> = {
      school: formData.get("school") as string,
      education_degree: formData.get("education_degree") as string,
      gpa: formData.get("gpa") ? parseFloat(formData.get("gpa") as string) : undefined,
      start_date: formData.get("start_date") ? new Date(formData.get("start_date") as string) : undefined,
      end_date: formData.get("end_date") ? new Date(formData.get("end_date") as string) : undefined,
      relevant_coursework: formData.get("relevant_coursework") as string
    };
    if (educationData.school.trim() == "" || !educationData.start_date || educationData.education_degree.trim() == "") {
      alert('Title, Description, and Start Date must be filled in to save.');
    } else {
      try {
        const updatedEducation = await updateEducation(educationID, educationData);
        console.log('Education updated successfully:', updatedEducation);
        setEducations((prevEducations) =>
          prevEducations.map((education) =>
            education.education_id === educationID ? updatedEducation : education
          )
        );
        toggleEditMode(education.education_id);
      } catch (error) {
        console.error('Error updating education:', error);
      }
    }
  };

  const handleDelete = async (educationID: string, index: number) => {
    try {
      await deleteEducation(educationID);
      console.log('Education deleted successfully');
      setEducations((prevEducations) =>
        prevEducations.filter((_, idx) => idx !== index)
      );
    }catch (error:any) {
      console.error('Error deleting education:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        // Optionally remove the record from the state if it does not exist in the database
        setEducations((prevEducations) =>
          prevEducations.filter((education) => education.education_id !== educationID)
        );
      }
    }
  };

  const handleCreation = async (ProfessionalID : string) => {
    const educationCreated = await createEducation(ProfessionalID);
    setEducations((prevEducations) => [...prevEducations, educationCreated]);
    setEditingCardId(educationCreated.education_id);
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <h1 className="text-5xl text-gptgreen font-koh_santepheap font-bold mb-1">Education</h1>
      <div className='w-full h-0.5 bg-outlinegray rounded-lg mt-3'></div>
      {educations.map((education, index) => (
        <div 
          onMouseEnter={() => setHoveredCardId(education.education_id)}
          onMouseLeave={() => setHoveredCardId(null)}
          key={education.education_id}
        >
          {editingCardId === education.education_id? (
            <form           
              className={`flex flex-col bg-outlinegray bg-opacity-20 border border-2 border-outlinegray shadow-lg rounded-lg p-4 my-4 mt-6`}
              onSubmit={(event) => handleSubmit(event, education.education_id, education)}
            >
              <div className="flex flex-row w-full">
                {/* School */}
                <div className="w-full">
                  <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>School</p>
                  <label>
                    <input
                      type="text"
                      name="school"
                      defaultValue={education.school || ""}
                      placeholder="School"
                      className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                    />
                  </label>
                </div>
                {/* Spacer */} <div className='w-40'/>
                {/* Degree */}
                <div className="w-full">
                  <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>Degree</p>
                  <label>
                    <input
                      type="text"
                      name="education_degree"
                      defaultValue={education.education_degree || ""}
                      placeholder="Degree"
                      className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                    />
                  </label>
                </div>
                {/* Spacer */} <div className='w-40'/>
                {/* GPA */}
                <div className="w-44 mr-6">
                  <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>GPA</p>
                  <label>
                    <input
                      type="text"
                      name="gpa"
                      defaultValue={education.gpa?.toString() || ""}
                      placeholder="GPA"
                      className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-row w-full text-secondarygray mt-3">
                {/* Start Date */}
                <div className="w-auto">
                  <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>From</p>
                  <label>
                    <input
                      type="date"
                      name="start_date"
                      defaultValue={education.start_date ? education.start_date.toISOString().split("T")[0] : ""}
                      className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
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
                      defaultValue={education.end_date ? education.end_date.toISOString().split("T")[0] : ""}
                      placeholder="End Date: "
                      className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-row w-full mt-3">
                <button 
                  className='flex items-center justify-center bg-gradient-to-r from-aiblue to-gptgreen felx-row text-white text-md rounded-3xl p-2 px-12 w-auto delay-50 hover:scale-105 duration-200 mr-auto'
                  type="submit"
                >Save</button>
                <button className="h-auto mr-4 rounded-lg text-xl text-secondarygray hover:text-primarygray"  
                  onClick={() => handleDelete(education.education_id, index)}><MdOutlineDeleteOutline /></button>
              </div>
            </form>
           ) : (
            <div className={`flex flex-col border border-2 border-outlinegray hover:border-gptgreen hover:shadow-lg rounded-lg p-4 my-4 mt-6 text-secondarygray`}>
              <div className="flex flex-row">
                <h1 className="text-primarygray">{education.school}</h1>
                <h1 className="text-primarygray mx-2">-</h1>
                <h1 className="text-primarygray mr-auto">{education.education_degree}</h1>
                {editingCardId === education.education_id || hoveredCardId === education.education_id? (
                  <button className="h-auto mr-4 rounded-lg text-xl" 
                    onClick={() => toggleEditMode(education.education_id)}>
                    <MdOutlineModeEdit />
                  </button>
                ) : null}
              </div>
              <p>{education.start_date? education.start_date.toLocaleDateString() : 'xxx'} {education.end_date? ` - ${education.end_date.toLocaleDateString()}` : ' '}</p>
              <h1 className="text-primarygray">GPA: {education.gpa}</h1>
            </div>
          )}
        </div>
      ))}
      <div className="w-full justify-center">
        <button onClick={() => handleCreation(professionalID)} className='flex flex-row items-center justify-center text-outlinegray hover:text-secondarygray text-md p-2'>
           <p className='text-4xl'>+</p>
           <p className="m-2 ">Add New Education</p>
        </button>  
      </div>
    </div>
  )
};

export default EducationComponent;
