import prisma from '@/lib/prisma';
import { Recommendation } from '@/types/recommendation';

const findRecommendationById = async (recommendationId: string) => {
    const recommendation = await prisma.recommendation.findUnique({
        where: { recommendation_id: recommendationId }
    });

    return recommendation;
}

const getAllRecommendations = async() => {
    const recommendation = await prisma.recommendation.findMany();
    return recommendation;
}

const createRecommendation = async (recommendationData: Recommendation) => {
    const recommendation = await prisma.recommendation.create({
        data: {
            ...recommendationData
        }
    });

    return recommendation;
}