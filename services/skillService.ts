/*
import prisma from '@/lib/prisma';
import { Skill } from '@/types/skill';

const findSkillById = async (skillId: string) => {
    const skill = await prisma.skill.findUnique({
        where: { skill_id: skillId }
    });

    return skill;
}

const getAllSkill = async() => {
    const skill = await prisma.skill.findMany();
    return skill;
}
1
const createSkill = async (skillData: Skill) => {
    const skill = await prisma.skill.create({
        data: {
            ...skillData
        }
    });

    return skill;
}
*/