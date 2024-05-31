"use client"
import React from "react";
import {getProjects, createProject, updateProject, deleteProject} from "@/services/professional_information/generalService";
import { useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import { getProfessionalByEmail } from "@/services/sessionService";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface Project {
  project_id: string;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
}

interface ProjectProps {
  projectsList : Project[];
  setProjects : React.Dispatch<React.SetStateAction<Project[]>>;
  professionalID: string | null;
}

const Projects: React.FC<ProjectProps> = ({projectsList, setProjects, professionalID}) => {
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, projectID: string) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const projectData: Partial<Project> = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      start_date: formData.get("start_date") ? new Date(formData.get("start_date") as string) : undefined,
      end_date: formData.get("end_date") ? new Date(formData.get("end_date") as string) : undefined,
    };

    if (projectData.description.trim() == "" || !projectData.start_date || projectData.name.trim() == "") {
      alert('Title, Description, and Start Date must be filled in to save.');
    } else {
      try {
        const updatedProject = await updateProject(projectID, projectData);
        console.log('Project updated successfully:', updatedProject);
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.project_id === projectID ? updatedProject : project
          )
        );
        toggleEditMode(project.project_id);
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }
  };

  const handleDelete = async (projectID: string, index: number) => {
    try {
      await deleteProject(projectID);
      console.log('Project deleted successfully');
      setProjects((prevProjects) =>
        prevProjects.filter((_, idx) => idx !== index)
      );
    }catch (error) {
      console.error('Error deleting project:', error);
      if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        setProjects((prevProjects) =>
        prevProjects.filter((project) => project.project_id !== projectID)
        );
      }
    }
  };

  const handleCreation = async (ProfessionalID : string) => {
    const projectCreated = await createProject(ProfessionalID);
    setProjects((prevProjects) => [...prevProjects, projectCreated]);
  }


  return (
    <div>
      {projectsList.map((project, index) => (
        <div key={project.project_id}>
          <h1>Project #{index + 1}</h1>
          <form onSubmit={(event) => handleSubmit(event, project.project_id)}>
            <label>
              <input
                type="text"
                name="name"
                defaultValue={project.name || ""}
                placeholder="Name: "
              />
            </label>
            <label>
              <input
                type="text"
                name="description"
                defaultValue={project.description || ""}
                placeholder="Description: "
              />
            </label>
            <label>
              <input
                type="date"
                name="start_date"
                defaultValue={project.start_date ? project.start_date.toISOString().split("T")[0] : ""}
                placeholder="Start Date: "
              />
            </label>
            <label>
              <input
                type="date"
                name="end_date"
                defaultValue={project.end_date ? project.end_date.toISOString().split("T")[0] : ""}
                placeholder="End Date: "
              />
            </label>
            <button type="submit">Save</button>
          </form>
          <button onClick={() => handleDelete(project.project_id, index)}>Delete</button>
        </div>
      ))}
      <button onClick={() => handleCreation(professionalID)}>Create New Project</button>
    </div>
  ); 
}

export default Projects;