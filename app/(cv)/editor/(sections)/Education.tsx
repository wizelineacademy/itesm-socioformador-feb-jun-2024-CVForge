"use client"
import React from "react";
import {useEffect, useState} from "react";
import {createEducation, getEducation, updateEducation, deleteEducation} from "@/services/professional_information/generalService";
import ProfessionalInfo from "../page";

interface Education {
  education_id: string;
  school: string;
  education_degree: string;
  gpa: number;
  start_date: Date;
  end_date: Date;
  relevant_coursework: string;
}

const EducationComponent: React.FC = () => {
  const staticID = "bc727100-e7af-48be-bdc4-07e982fb5145";
  const [educations, setEducations] = useState<Education[]>([]);

  useEffect(() => {
    const fetchEducations = async () => {
      const fetchedEducations = await getEducation(staticID);
      setEducations(fetchedEducations);
    }
    fetchEducations();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, educationID: string) => {
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

    try {
      const updatedEducation = await updateEducation(educationID, educationData);
      console.log('Education updated successfully:', updatedEducation);
      setEducations((prevEducations) =>
        prevEducations.map((education) =>
          education.education_id === educationID ? updatedEducation : education
        )
      );
    } catch (error) {
      console.error('Error updating education:', error);
    }
  };

  const handleDelete = async (educationID: string, index: number) => {
    try {
      await deleteEducation(educationID);
      console.log('Education deleted successfully');
      setEducations((prevEducations) =>
        prevEducations.filter((_, idx) => idx !== index)
      );
    }catch (error) {
      console.error('Error deleting education:', error);
      if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
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
  }

  return (
    <div>
      {educations.map((education, index) => (
        <div key={education.education_id}>
          <h1>Education #{index + 1}</h1>
          <form onSubmit={(event) => handleSubmit(event, education.education_id)}>
            <label>
              <input
                type="text"
                name="school"
                defaultValue={education.school || ""}
                placeholder="School: "
              />
            </label>
            <label>
              <input
                type="text"
                name="education_degree"
                defaultValue={education.education_degree || ""}
                placeholder="Education Degree: "
              />
            </label>
            <label>
              <input
                type="text"
                name="gpa"
                defaultValue={education.gpa?.toString() || ""}
                placeholder="GPA: "
              />
            </label>
            <label>
              <input
                type="date"
                name="start_date"
                defaultValue={education.start_date ? education.start_date.toISOString().split("T")[0] : ""}
                placeholder="Start Date: "
              />
            </label>
            <label>
              <input
                type="date"
                name="end_date"
                defaultValue={education.end_date ? education.end_date.toISOString().split("T")[0] : ""}
                placeholder="End Date: "
              />
            </label>
            <label>
              <input
                type="text"
                name="relevant_coursework"
                defaultValue={education.relevant_coursework || ""}
                placeholder="Relevant Coursework: "
              />
            </label>
            <button type="submit">Save</button>
          </form>
          <button onClick={() => handleDelete(education.education_id, index)}>Delete</button>
        </div>
      ))}
      <button onClick={() => handleCreation(staticID)}>Create New Education</button>
    </div>
  );
};

export default EducationComponent;
