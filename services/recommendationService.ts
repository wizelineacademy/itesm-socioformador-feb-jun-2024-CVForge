import prisma from '@/lib/prisma';
import { Prisma, recommendation } from '@prisma/client';

const createRecommendation = async (recommendationData: Prisma.recommendationCreateInput) => {
    const recommendation = await prisma.recommendation.create({
        data: {
            ...recommendationData
        }
    });

    return recommendation;
}

const findRecommendationById = async (recommendationId: string) => {
    const recommendation = await prisma.recommendation.findUnique({
        where: { recommendation_id: recommendationId }
    });

    return recommendation;
}

const findRecommendationsByCvId = async (cvId: string) => {
    const recommendation = await prisma.recommendation.findMany({
        where: { cv_id: cvId }
        // where: {
        //     cv: {
        //         cv_id: cvId
        //     }
        // }
    });
    return recommendation;
}


const getAllRecommendation = async () => {
    const recommendation = await prisma.recommendation.findMany();
    return recommendation;
}

export default {
    createRecommendation,
    findRecommendationById,
    findRecommendationsByCvId,
    getAllRecommendation
}