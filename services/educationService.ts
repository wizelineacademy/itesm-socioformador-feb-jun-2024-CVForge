import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';  
import {Education} from '@/types/education'

const findEducationById = async (educationId: string) => {
  const education = await prisma.education.findUnique({
    where: { education_id: educationId },
  });
  return education;
};

const getEducation = async() => {
  const education = await prisma.education.findMany();
  return education;
}

const createUser = async (educationData: Prisma.educationCreateInput) => {
  const education = await prisma.education.create({
     data: {
       ...educationData,
     },
  });
  return education;
 };

export default {
  findEducationById, 
  createUser,
  getEducation
}