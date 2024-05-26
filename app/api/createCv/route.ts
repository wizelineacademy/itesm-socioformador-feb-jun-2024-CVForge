import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { MOCK_PROFESSIONAL_INFO } from "../../(cv)/cv/[cv_id]/CONSTANTS";
import generateCV from "@/scripts/cv_generation";

const prisma = new PrismaClient();
const STATIC_CV_ID = "828e9129-21e6-4523-8bb1-bd4e7e3c9cc4";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { cvId, professionalInfo, selectedPosition } = data;

    // Call the generateCV function with the parsed CV content
    const generatedCV = await generateCV(professionalInfo, selectedPosition);

    // Update the static CV entry in the database or handle the response
    const updatedCv = await prisma.cv.update({
      where: { cv_id: cvId },
      data: {
        content: generatedCV,
      },
    });

    return NextResponse.json({
      message: "CV processed successfully",
      results: updatedCv,
    });
  } catch (error) {
    console.error("Error in POST method:", error);
    return NextResponse.json({ error: error.message });
  }
}
