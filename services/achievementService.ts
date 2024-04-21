import prisma from '@/lib/prisma';
import { Achievement } from '@/types/achievement';

const findAchievementById = async (achievementId: string) => {
    const achievement = await prisma.achievement.findUnique({
        where: { achievement_id: achievementId }
    });

    return achievement;
}

const getAllAchievements = async() => {
    const achievement = await prisma.achievement.findMany();
    return achievement;
}

const createAchievement = async (achievementData: Achievement) => {
    const achievement = await prisma.achievement.create({
        data: {
            ...achievementData
        }
    });

    return achievement;
}