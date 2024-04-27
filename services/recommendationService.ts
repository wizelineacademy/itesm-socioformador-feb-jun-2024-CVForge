import prisma from '@/lib/prisma';
import { recommendation } from '@prisma/client';

const createRecommendation = async (recommendationData: recommendation) => {
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
 // nothing yet
}

const getAllRecommendation = async() => {
    const recommendation = await prisma.recommendation.findMany();
    return recommendation;
}

export default {
    createRecommendation,
    findRecommendationById,
    getAllRecommendation
}