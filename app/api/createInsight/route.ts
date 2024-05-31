import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import generate_recommendations from "@/scripts/insight_generation";
import { parse } from 'url';

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const { query } = parse(req.url || '', true);
        const cvId = query.cvId as string;
        const jobPosition = query.jobPosition as string;

        // Check if recommendations already exist for the given CV
        const existingRecommendations = await prisma.recommendation.findMany({
            where: { cv_id: cvId },
        });

        if (existingRecommendations.length > 0) {
            return NextResponse.json({ message: existingRecommendations });
        }

        // If recommendations do not exist, generate new ones
        const defaultCvId = "28b8183b-239d-4a8d-8485-6a4edb5ff943";

        const generatedCv = await prisma.cv.findUnique({
            where: { cv_id: cvId || defaultCvId },
        });
        const cvData = generatedCv.content;

        const recommendations = await generate_recommendations(cvData, jobPosition);
        console.log(jobPosition, recommendations);

        const validRecommendations = recommendations.filter(recommendation => recommendation.title && recommendation.main_content);

        const savedRecommendations = await Promise.all(validRecommendations.map(async (recommendation) => {
            return prisma.recommendation.create({
                data: {
                    cv_id: cvId || defaultCvId,
                    title: recommendation.title,
                    main_content: recommendation.main_content,
                    completed: false 
                }
            });
        }));

        return NextResponse.json({ message: savedRecommendations });
    } catch (error: any) {
        console.error("Error in generating recommendations:", error);
        return NextResponse.json({ error: error.message });
    }
}
