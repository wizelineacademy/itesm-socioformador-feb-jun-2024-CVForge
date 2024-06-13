import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import generateCV from "@/scripts/cv_generation"
import generate_recommendations from "@/scripts/insight_generation"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { cvId, professionalInfo, selectedPosition } = data

    // Call the generateCV function with the parsed CV content
    const generatedCV = await generateCV(professionalInfo, selectedPosition)

    // Update the CV content in the database
    const updatedCv = await prisma.cv.update({
      where: { cv_id: cvId },
      data: {
        content: generatedCV,
      },
    })

    // Generate recommendations based on the updated CV content
    const recommendations = await generate_recommendations(
      generatedCV,
      selectedPosition,
    )

    // Filter valid recommendations
    const validRecommendations = recommendations.filter(
      (recommendation) => recommendation.title && recommendation.main_content,
    )

    // Save recommendations in the database
    const savedRecommendations = await Promise.all(
      validRecommendations.map(async (recommendation) => {
        const recommendationTitle = `Recommendation: ${recommendation.title}`
        return prisma.recommendation.create({
          data: {
            cv_id: cvId,
            title: recommendationTitle,
            main_content: recommendation.main_content,
            completed: false,
          },
        })
      }),
    )

    return NextResponse.json({
      message: "CV and recommendations processed successfully",
      results: { updatedCv, savedRecommendations },
    })
  } catch (error) {
    console.error("Error in POST method:", error)
    return NextResponse.json({ error: error.message })
  }
}
