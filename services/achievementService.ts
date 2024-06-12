import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

const createAchievement = async (
  achievementData: Prisma.achievementCreateInput,
) => {
  const achievement = await prisma.achievement.create({
    data: {
      ...achievementData,
    },
  })

  return achievement
}

const findAchievementById = async (achievementId: string) => {
  const achievement = await prisma.achievement.findUnique({
    where: { achievement_id: achievementId },
  })

  return achievement
}

const findAchievementByProfessionalInfoId = async (
  professionalInfoId: string,
) => {
  const achievement = await prisma.achievement.findMany({
    where: { professional_info_id: professionalInfoId },
    // where: {professional_info: {professional_info_id: professionalInfoId}}
  })

  return achievement
}

const getAllAchievements = async () => {
  const achievement = await prisma.achievement.findMany()
  return achievement
}

export default {
  createAchievement,
  findAchievementById,
  findAchievementByProfessionalInfoId,
  getAllAchievements,
}
