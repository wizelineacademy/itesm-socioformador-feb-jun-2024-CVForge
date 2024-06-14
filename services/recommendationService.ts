"use server";
import prisma from "@/lib/prisma";
import { Prisma, recommendation } from "@prisma/client";

export const createRecommendation = async (
  recommendationData: Prisma.recommendationCreateInput
) => {
  const recommendation = await prisma.recommendation.create({
    data: {
      ...recommendationData,
    },
  });

  return recommendation;
};

export const findRecommendationById = async (recommendationId: string) => {
  const recommendation = await prisma.recommendation.findUnique({
    where: { recommendation_id: recommendationId },
  });

  return recommendation;
};

export const findRecommendationsByCvId = async (cvId: string): Promise<recommendation[]> => {
    try {
        const recommendations = await prisma.recommendation.findMany({
            where: { cv_id: cvId }
        });
        return recommendations;
    } catch (error) {
        console.error("Failed to fetch recommendations for CV ID:", cvId, error);
        throw error;
    }
};

export const getAllRecommendation = async () => {
  const recommendations = await prisma.recommendation.findMany();
  return recommendations;
};
