"use server"
import prisma from "@/lib/prisma";

//Get General Information from an specific professional_id

const getGeneralInfo = async (professionalID: string) => {
  const generalInfo = await prisma.general_info.findUnique(
    {where: {professional_info_id : professionalID }}
  )
  return generalInfo;
}

const getEducation = async (professionalID: string) => {
  const education = await prisma.education.findMany(
    {where: {professional_info_id : professionalID}}
  )
}

export {getGeneralInfo, getEducation}
