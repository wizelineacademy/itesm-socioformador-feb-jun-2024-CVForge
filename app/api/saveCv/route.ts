import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

import { MOCK_PROFESSIONAL_INFO } from "../../(cv)/cv/[cv_id]/CONSTANTS"
import generateCV from "@/scripts/cv_generation"

const prisma = new PrismaClient()
const STATIC_CV_ID = "828e9129-21e6-4523-8bb1-bd4e7e3c9cc4"

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { cvContent, selectedPosition } = await req.json()
    const data = req.body
    const cvData = JSON.stringify(MOCK_PROFESSIONAL_INFO)

    const jobPosition = selectedPosition

    // Call the generateCV function
    const generatedCV = cvContent || (await generateCV(cvData, jobPosition))
    // Update the static CV entry in the database
    const updatedCv = await prisma.cv.update({
      where: { cv_id: STATIC_CV_ID },
      data: {
        content: generatedCV,
      },
    })

    // Return the parsed results as a JSON response
    return NextResponse.json({
      message: "CV processed successfully",
      results: updatedCv,
    })
  } catch (error) {
    console.error("Error in JavaScript script execution:", error)
    return NextResponse.json({ error: error.message })
  }
}
