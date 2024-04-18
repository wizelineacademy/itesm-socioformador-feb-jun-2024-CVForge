import prisma from '@/lib/prisma';
import { CvInsight } from '@/types/cvInsight';

const findCVInsightById = async (cvInsightId: string) => {
    const cvInsight = await prisma.cv_insight.findUnique({
        where: { cv_insight_id: cvInsightId }
    });

    return findCVInsightById;
}

const getAllCVInsight = async() => {
    const cvInsight = await prisma.cv_insight.findMany();
    return cvInsight;
}

const createCVInsight = async (cvInsightData: CvInsight) => {
    const cvInsight = await prisma.cv_insight.create({
        data: {
            ...cvInsightData
        }
    });

    return cvInsight;
}

export default {
    findCVInsightById,
    getAllCVInsight,
    createCVInsight
}