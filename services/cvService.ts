"use server";

import prisma from '@/lib/prisma';

export const findCVById = async (cvID: string) => {
  const cv = await prisma.cv.findUnique({
    where: { cv_id: cvID },
  });
  return cv;
};

export const getAllCVs = async() => {
  const cvs = await prisma.cv.findMany();
  return cvs;
}

/*
export const createCV = async (cvBody: CVCreateBody) => {
  const post = await prisma.post.create({ data: postBody })
  return post
}
*/
/*
export const createCV = async (cvData: User) => {
  const user = await prisma.users.create({
     data: {
       ...userData,
       last_login: new Date(),
       created_at: new Date(),
       updated_at: new Date(),
     },
  });
  return user;
 };*/