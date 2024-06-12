import prisma from '@/lib/prisma'
import * as cvService from '@/services/cvService'
import { Prisma } from '@prisma/client'
import { expect } from '@jest/globals'

// Mock the prisma client
jest.mock('@/lib/prisma', () => ({
  cv: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
}))

describe('CV Service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('findCVById should return a CV record', async () => {
    // Mock CV data
    const mockCVId = '1'
    const mockCV = {
      cv_id: mockCVId,
      title: 'Software Developer CV',
    }

    // Mock the Prisma client function to resolve with mock CV
    ;(prisma.cv.findUnique as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockCV),
    )

    // Call the function under test
    const cv = await cvService.findCVById(mockCVId)

    // Assertions
    expect(cv).toEqual(mockCV)
    expect(prisma.cv.findUnique).toHaveBeenCalledWith({
      where: { cv_id: mockCVId },
    })
  })

  test('getAllCVs should return all CVs for a user', async () => {
    // Mock CVs data
    const mockUserId = '123'
    const mockCVs = [
      {
        cv_id: '1',
        title: 'Software Developer CV',
        desired_position_id: '456',
      },
      {
        cv_id: '2',
        title: 'Data Scientist CV',
      },
    ]

    // Mock the Prisma client function to resolve with mock CVs
    ;(prisma.cv.findMany as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockCVs),
    )

    // Call the function under test
    const cvs = await cvService.getAllCVs(mockUserId)

    // Assertions
    expect(cvs).toEqual(mockCVs)
    expect(prisma.cv.findMany).toHaveBeenCalledWith({
      where: { user_id: mockUserId },
    })
  })

  test('createCV should create a new CV record', async () => {
    // Mock CV data
    const mockCVData: Prisma.cvCreateInput = {
      title: 'Software Developer CV',
    }
    const mockCreatedCV = {
      cv_id: '1',
      ...mockCVData,
    }

    // Mock the Prisma client function to resolve with mock created CV
    ;(prisma.cv.create as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockCreatedCV),
    )

    // Call the function under test
    const createdCV = await cvService.createCV(mockCVData)

    expect(createdCV).toEqual(mockCreatedCV)
    expect(prisma.cv.create).toHaveBeenCalledWith({ data: mockCVData })
  })

  test('deleteCV should delete a CV record', async () => {
    // Mock CV ID
    const mockCVId = '1'

    // Call the function under test
    await cvService.deleteCV(mockCVId)

    // Assertions
    expect(prisma.cv.delete).toHaveBeenCalledWith({
      where: { cv_id: mockCVId },
    })
  })
})
