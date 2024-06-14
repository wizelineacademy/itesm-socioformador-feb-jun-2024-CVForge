"use server";

import prisma from "@/lib/prisma";

export const findCVById = async (cvID: string) => {
  try {
    const cv = await prisma.cv.findUnique({
      where: { cv_id: cvID },
    });
    console.log(cv);
    return cv;
  } catch (error) {
    console.error("Failed to fetch CV:", error);
    return null;
  }
};

export const getAllCVs = async (userId: string) => {
  const cvs = await prisma.cv.findMany({
    where: {
      user_id: userId,
    },
  });
  return cvs;
};

export const createCV = async (data: {
  user_id?: string;
  title?: string;
  desired_position_id?: string;
}) => {
  const newCV = await prisma.cv.create({
    data: {
      ...data,
    },
  });
  return newCV;
};

export const deleteCV = async (cvId: string) => {
  console.log("Cv id that i am deleting: ", cvId);
  const deletedCV = await prisma.cv.delete({
    where: {
      cv_id: cvId,
    },
  });
  return deletedCV;
};
