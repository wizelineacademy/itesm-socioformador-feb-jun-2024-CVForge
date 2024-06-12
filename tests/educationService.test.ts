import prisma from '@/lib/prisma'
import educationService from '@/services/educationService'
import { Prisma } from '@prisma/client'
import { expect } from '@jest/globals'

// Mock the prisma client
jest.mock('@/lib/prisma', () => ({
  education: {
    findUnique: jest.fn().mockImplementation((query) => {
      if (query.where.education_id === '1') {
        return Promise.resolve({
          education_id: '1',
          school: 'Tec de Monterrey',
          education_degree: 'Computer Science',
          gpa: 4.0,
          start_date: new Date('2024-04-01'),
          end_date: new Date('2027-06-01'),
          relevant_coursework: 'Sample Coursework',
        })
      } else {
        return Promise.resolve(null)
      }
    }),
    findMany: jest.fn().mockImplementation(() => {
      return Promise.resolve([
        {
          education_id: '1',
          school: 'Tec de Monterrey',
          education_degree: 'Computer Science',
          gpa: 4.0,
          start_date: new Date('2024-04-01'),
          end_date: new Date('2027-06-01'),
          relevant_coursework: 'Sample Coursework',
        },
        {
          education_id: '2',
          school: 'UDEM',
          education_degree: 'Arts',
          gpa: 3.5,
          start_date: new Date('2018-05-12'),
          end_date: new Date('2022-05-01'),
          relevant_coursework: 'Another Coursework',
        },
      ])
    }),
    create: jest
      .fn()
      .mockImplementation((data) =>
        Promise.resolve({ education_id: '1', ...data.data }),
      ),
  },
}))

describe('Education Services', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('createUser should add a new education record', async () => {
    const newEducationData: Prisma.educationCreateInput = {
      school: 'Tec de Monterrey',
      education_degree: 'Computer Science',
      gpa: 4.0,
      start_date: new Date('2024-04-01'),
      end_date: new Date('2027-06-01'),
      relevant_coursework: 'Sample Coursework',
    }

    const expectedEducation = {
      education_id: '1',
      ...newEducationData,
    }

    // Call the function under test
    const education = await educationService.createUser(newEducationData)

    // Assertions to check both the result and the call to the Prisma create method
    expect(education).toEqual(expectedEducation)
    expect(prisma.education.create).toHaveBeenCalledWith({
      data: newEducationData,
    })
  })

  test('findEducationById should return an education record', async () => {
    const mockEducationId = '1'
    const mockEducation = {
      education_id: mockEducationId,

      school: 'Tec de Monterrey',
      education_degree: 'Computer Science',
      gpa: 4.0,
      start_date: new Date('2024-04-01'),
      end_date: new Date('2027-06-01'),
      relevant_coursework: 'Sample Coursework',
    }

    // Perform the function call
    const education = await educationService.findEducationById(mockEducationId)

    // Check that the returned value matches the expected mock value
    expect(education).toEqual(mockEducation)
    // Verify the method was called correctly
    expect(prisma.education.findUnique).toHaveBeenCalledWith({
      where: { education_id: mockEducationId },
    })
  })

  test('getEducation should return all education records', async () => {
    const mockEducations = [
      {
        education_id: '1',
        school: 'Tec de Monterrey',
        education_degree: 'Computer Science',
        gpa: 4.0,
        start_date: new Date('2024-04-01'),
        end_date: new Date('2027-06-01'),
        relevant_coursework: 'Sample Coursework',
      },
      {
        education_id: '2',
        school: 'UDEM',
        education_degree: 'Arts',
        gpa: 3.5,
        start_date: new Date('2018-05-12'),
        end_date: new Date('2022-05-01'),
        relevant_coursework: 'Another Coursework',
      },
    ]

    // Perform the function call
    const educations = await educationService.getEducation()

    // Check that the returned value matches the expected mock value
    expect(educations).toEqual(mockEducations)
    // Verify the method was called correctly
    expect(prisma.education.findMany).toHaveBeenCalledWith()
  })
})
