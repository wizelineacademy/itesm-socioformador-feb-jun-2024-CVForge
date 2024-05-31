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

const Projects: React.FC = () => {
  const { data: session } = useSession();
  const [professionalID, setProfessionalID] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
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
    const fetchProjects = async () => {
      try {
        const projectsGetted = await getProjects(professionalID);
        setProjects(projectsGetted);
      }
      catch (error) {
        console.log("There was an error trying to fetch the projects", error)
      }
    }
    fetchProjects();
  }, [professionalID]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, projectID: string, project: Project) => {
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
    setEditingCardId(projectCreated.project_id);
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <h1 className="text-5xl text-gptgreen font-koh_santepheap font-bold mb-1">Projects</h1>
      <div className='w-full h-0.5 bg-outlinegray rounded-lg mt-3'></div>
      {projects.map((project, index) => (
        <div 
          onMouseEnter={() => setHoveredCardId(project.project_id)}
          onMouseLeave={() => setHoveredCardId(null)}
          key={project.project_id}
        >
          {editingCardId === project.project_id? (
            <form           
              className={`flex flex-col bg-outlinegray bg-opacity-20 border border-2 border-outlinegray shadow-lg rounded-lg p-4 my-4 mt-6`}
              onSubmit={(event) => handleSubmit(event, project.project_id, project)}
            >
              <div className="flex flex-row w-full">
                {/* Name */}
                <div className="w-full">
                  <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>Project Name</p>
                  <label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={project.name || ""}
                      placeholder="Name"
                      className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
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
                      defaultValue={project.start_date ? project.start_date.toISOString().split("T")[0] : ""}
                      placeholder="Start Date: "
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
                      defaultValue={project.end_date ? project.end_date.toISOString().split("T")[0] : ""}
                      placeholder="End Date"
                      className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-row w-full text-secondarygray ">
                {/* Description */}
                <div className="w-full">
                  <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>Description</p>
                  <label>
                    <input
                      type="text"
                      name="description"
                      defaultValue={project.description || ""}
                      placeholder="Description"
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
                  onClick={() => handleDelete(project.project_id, index)}><MdOutlineDeleteOutline /></button>
              </div>
            </form>
           ) : (
            <div className={`flex flex-col border border-2 border-outlinegray hover:border-gptgreen hover:shadow-lg rounded-lg p-4 my-4 mt-6 text-secondarygray`}>
              <div className="flex flex-row">
                <h1 className="text-primarygray mr-auto">{project.name}</h1>
                {editingCardId === project.project_id || hoveredCardId === project.project_id? (
                  <button className="h-auto mr-4 rounded-lg text-xl" 
                    onClick={() => toggleEditMode(project.project_id)}>
                    <MdOutlineModeEdit />
                  </button>
                ) : null}
              </div>
              <p>{project.start_date? project.start_date.toLocaleDateString() : 'xxx'} {project.end_date? ` - ${project.end_date.toLocaleDateString()}` : ' '}</p>
              <p>{project.description}</p>
            </div>
          )}
        </div>
      ))}
      <div className="w-full justify-center">
        <button onClick={() => handleCreation(professionalID)} className='flex flex-row items-center justify-center text-outlinegray hover:text-secondarygray text-md p-2'>
           <p className='text-4xl'>+</p>
           <p className="m-2 ">Add New Project</p>
        </button>  
      </div>
    </div>
  )
}

export default Projects;
/*
return (
    <div>
      {projects.map((project, index) => (
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
  )
*/