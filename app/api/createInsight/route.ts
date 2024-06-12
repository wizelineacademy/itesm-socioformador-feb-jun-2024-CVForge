import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import generate_recommendations from '@/scripts/insight_generation'
import { parse } from 'url'

const prisma = new PrismaClient()

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { query } = parse(req.url || '', true)
    const cvId = query.cvId as string
    const jobPosition = query.jobPosition as string

    // Validate input
    if (!cvId || !jobPosition) {
      return NextResponse.json({ error: 'Missing cvId or jobPosition' })
    }

    // Check if recommendations already exist for the given CV
    const existingRecommendations = await prisma.recommendation.findMany({
      where: { cv_id: cvId },
    })

    if (existingRecommendations.length > 0) {
      return NextResponse.json({ message: existingRecommendations })
    }

    // Fetch the CV data
    const generatedCv = await prisma.cv.findUnique({
      where: { cv_id: cvId },
    })

    if (!generatedCv) {
      return NextResponse.json({ error: 'CV not found' })
    }

    const cvData = generatedCv.content

    // Generate new recommendations
    const recommendations = await generate_recommendations(cvData, jobPosition)

    // Ensure the recommendations are valid and contain the necessary fields
    const validRecommendations = recommendations.filter(
      (recommendation) => recommendation.title && recommendation.main_content,
    )

    return NextResponse.json({ message: recommendations })
  } catch (error: any) {
    console.error('Error in generating recommendations:', error)
    return NextResponse.json({ error: error.message })
  }
}
