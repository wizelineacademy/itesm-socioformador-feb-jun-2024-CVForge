"use server";
import prisma from "@/lib/prisma";
import { general_info, professional_info } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

interface GeneralInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  github_link: string;
  linkedin_link: string;
}

interface Education {
  education_id: string;
  school: string;
  education_degree: string;
  gpa: number;
  start_date: Date;
  end_date: Date;
  relevant_coursework: string;
}

interface EducationInput {
  school: string;
  educationDegree: string;
  gpa?: number;
  startDate?: Date;
  endDate?: Date;
  relevantCoursework?: string[];
}

interface Project {
  project_id: string;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
}

interface Work {
  work_experience_id: string;
  work_position: string;
  description: string;
  start_date: Date;
  end_date: Date;
}

interface Skill {
  title: string;
  proficiency: string;
}

//General Info Services
const getGeneralInfo = async (
  professionalID: string
): Promise<GeneralInfo | null> => {
  const generalInfo = await prisma.general_info.findUnique({
    where: { professional_info_id: professionalID },
    select: {
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
      github_link: true,
      linkedin_link: true,
    },
  });
  return generalInfo;
};

const createGeneralInfo = async (professionalID, generalData) => {
  // Check if general info already exists for the professional
  if (professionalID) {
    const existingInfo = await prisma.general_info.findUnique({
      where: { professional_info_id: professionalID },
    });

    if (existingInfo) {
      console.error("General info already exists, consider updating instead");
      return existingInfo; // Handle existing info case
    }
  }

  const newGeneralInfo = await prisma.general_info.create({
    data: {
      ...generalData,
      professional_info_id: professionalID, // Ensure this ID is correctly associated
    },
  });

  return newGeneralInfo;
};

//Education services
const getEducation = async (professionalID: string): Promise<Education[]> => {
  const educations = await prisma.education.findMany({
    where: { professional_info_id: professionalID },
    select: {
      education_id: true,
      school: true,
      education_degree: true,
      gpa: true,
      start_date: true,
      end_date: true,
      relevant_coursework: true,
    },
  });
  return educations;
};

const createEducation = async (professionalID: string) => {
  const createdEducation = await prisma.education.create({
    data: {
      professional_info: {
        connect: {
          professional_info_id: professionalID,
        },
      },
    },
  });
  return createdEducation;
};

const updateEducation = async (
  educationID: string,
  educationData: Partial<Education>
) => {
  const updatedEducation = await prisma.education.update({
    where: { education_id: educationID },
    data: educationData,
  });
  return updatedEducation;
};

const deleteEducation = async (educationID: string) => {
  try {
    const deletedEducation = await prisma.education.delete({
      where: { education_id: educationID },
    });
    return deletedEducation;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.error("Error: Record to delete does not exist");
      } else {
        console.error("Prisma error code:", error.code);
      }
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
};

//Projects services

const getProjects = async (professionalID: string): Promise<Project[]> => {
  const arrayProjects = await prisma.project.findMany({
    where: { professional_info_id: professionalID },
  });
  return arrayProjects;
};

const createProject = async (professionalID: string): Promise<Project> => {
  const createdProject = await prisma.project.create({
    data: {
      professional_info: {
        connect: {
          professional_info_id: professionalID,
        },
      },
    },
  });
  return createdProject;
};

const updateProject = async (
  projectID: string,
  projectData: Partial<Project>
): Promise<Project> => {
  const updatedProject = await prisma.project.update({
    where: { project_id: projectID },
    data: projectData,
  });
  return updatedProject;
};

const deleteProject = async (projectID: string): Promise<Project> => {
  const deletedProject = await prisma.project.delete({
    where: { project_id: projectID },
  });
  return deletedProject;
};

//Work experience services
const getWorks = async (professionalID: string): Promise<Work[]> => {
  const arrayWorks = await prisma.work_experience.findMany({
    where: { professional_info_id: professionalID },
  });
  return arrayWorks;
};

const createWork = async (professionalID: string): Promise<Work> => {
  const createdWork = await prisma.work_experience.create({
    data: {
      professional_info: {
        connect: {
          professional_info_id: professionalID,
        },
      },
    },
  });
  return createdWork;
};

const updateWork = async (
  workID: string,
  workData: Partial<Work>
): Promise<Work> => {
  const updatedWork = await prisma.work_experience.update({
    where: { work_experience_id: workID },
    data: workData,
  });
  return updatedWork;
};

const deleteWork = async (workID: string): Promise<Work> => {
  const deletedWork = await prisma.work_experience.delete({
    where: { work_experience_id: workID },
  });
  return deletedWork;
};

//Work experience services
const getSkills = async (professionalID: string): Promise<Skill[]> => {
  const arraySkills = await prisma.skill.findMany({
    where: { professional_info_id: professionalID },
  });
  return arraySkills;
};
/*
const createSkill = async (professionalID: string): Promise<Work> => {
  const createdWork = await prisma.skill.create({
    data: {
      professional_info: {
        connect: {
          professional_info_id: professionalID,
        },
      },
    },
  });
  return createdWork;
};

const updateWork = async (workID: string, workData: Partial<Work>): Promise<Work> => {
  const updatedWork = await prisma.work_experience.update(
    {
      where : {work_experience_id : workID},
      data : workData,
    }
  )
  return updatedWork;
};

const deleteWork = async (workID: string): Promise<Work> => {
  const deletedWork  = await prisma.work_experience.delete({
    where : {work_experience_id : workID}
  })
  return deletedWork;
}
*/
export {
  getGeneralInfo,
  createGeneralInfo,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getWorks,
  createWork,
  updateWork,
  deleteWork,
};
