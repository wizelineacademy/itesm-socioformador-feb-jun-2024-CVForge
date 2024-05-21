"use server"
import prisma from "@/lib/prisma";

//Get General Information from an specific professional_id

const getGeneralInfo = async (professionalID: string) => {
  const generalInfo = await prisma.general_info.findUnique(
    {where: {professional_info_id : professionalID }}
  )
  return generalInfo;
}

const createGeneralInfo = async (
  professionalID: string,
  generalData: Prisma.general_infoCreateInput
) => {
  const newGeneralInfo = await prisma.general_info.create({
    data: {
      ...generalData,
      professional_info: {
        connect: { professional_info_id: professionalID },
      },
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

const updateProject = async (projectID: string, projectData: Partial<Project>): Promise<Project> => {
  const updatedProject = await prisma.project.update(
    {
      where : {project_id : projectID},
      data : projectData,
    }
  )
  return updatedProject;
};

const deleteProject = async (projectID: string): Promise<Project> => {
  const deletedProject  = await prisma.project.delete({
    where : {project_id : projectID}
  })
  return deletedProject;
}


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


//Work experience services
const getSkills = async (professionalID: string): Promise<Skill[]> => {
  const arraySkills = await prisma.skill.findMany({
    where: { professional_info_id: professionalID },
  });
  return arraySkills;
};


/*

const createSkill = async (professionalID: string): Promise<Skill> => {
  const createdSkill = await prisma.skill.create({
    data: {
      professional_info: {
        connect: {
          professional_info_id: professionalID,
        },
      },
    },
  });
  return createdSkill;
};

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
