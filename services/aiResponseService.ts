import prisma from '@/lib/prisma'
import { AIResponse } from '@/types/aiResponse'
import { ai_response } from '@prisma/client'

const findAIResponseByID = async (aiResponseId: string) => {
  const aiResponse = await prisma.ai_response.findUnique({
    where: { ai_response_id: aiResponseId },
  })

  return aiResponse
}

const getAllAIResponse = async () => {
  const aiResponse = await prisma.ai_response.findMany()
  return aiResponse
}

const createAIResponse = async (aiResponseData: AIResponse) => {
  const aiResponse = await prisma.ai_response.create({
    data: {
      ...aiResponseData,
    },
  })

  return aiResponse
}

export default {
  findAIResponseByID,
  getAllAIResponse,
  createAIResponse,
}
