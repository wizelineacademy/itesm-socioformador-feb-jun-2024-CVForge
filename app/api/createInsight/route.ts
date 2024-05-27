import { NextRequest, NextResponse } from 'next/server';
import { generate_recommendations } from "@/scripts/insight_generation";
import { PrismaClient } from "@prisma/client";
import { parse } from 'url';

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const { query } = parse(req.url || '', true);
        const cvId = query.cvId as string;
        const defaultCvId = "28b8183b-239d-4a8d-8485-6a4edb5ff943";

        const generatedCv = await prisma.cv.findUnique({
            where: { cv_id: cvId || defaultCvId },
        });
        const cvData = generatedCv.content;

        const recommendations = await generate_recommendations(cvData);

        return NextResponse.json({ message: recommendations });
    } catch (error: any) {
        console.error("Error in generating recommendations:", error);
        return NextResponse.json({ error: error.message });
    }
}
