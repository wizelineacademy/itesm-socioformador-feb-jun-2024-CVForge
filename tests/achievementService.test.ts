import prisma from '@/lib/prisma'
import achievementService from '@/services/achievementService'
import { Achievement } from '@/types/achievement'
import { expect } from '@jest/globals'

jest.mock('@/lib/prisma', () => ({
  achievement: {
    findUnique: jest.fn().mockImplementation((query) => {
      if (query.where.achievement_id === '1') {
        return Promise.resolve({
          achievement_id: '1',
          name: 'First Achievement',
          description: 'Achieved something important',
        })
      } else {
        return Promise.resolve(null)
      }
    }),
    findMany: jest.fn().mockImplementation((query = {}) => {
      const { where } = query
      if (where && where.professional_info_id === 'info1') {
        return Promise.resolve([
          {
            achievement_id: '1',
            professional_info_id: 'info1',
            name: 'First Achievement',
            description: 'Achieved something important',
          },
          {
            achievement_id: '3',
            professional_info_id: 'info1',
            name: 'Third Achievement',
            description: 'Achieved yet another thing',
          },
        ])
      } else if (!where) {
        // Returns all achievements when there is no filtering condition
        return Promise.resolve([
          {
            achievement_id: '1',
            name: 'First Achievement',
            description: 'Achieved something important',
          },
          {
            achievement_id: '2',
            name: 'Second Achievement',
            description: 'Achieved another thing',
          },
        ])
      } else {
        return Promise.resolve([]) // Returns an empty array for any other professional_info_id
      }
    }),
    create: jest
      .fn()
      .mockImplementation((data) =>
        Promise.resolve({ achievement_id: '1', ...data.data }),
      ),
  },
}))

describe('Achievement Services', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('createAchievement should add a new achievement', async () => {
    const newAchievementData = {
      achievement_id: '1',
      name: 'New Achievement',
      description: 'Description of the new achievement',
    }

    const expectedAchievement = {
      achievement_id: '1', // Mock the expected return including an auto-generated ID
      ...newAchievementData,
    }

    const achievement =
      await achievementService.createAchievement(newAchievementData)

    expect(achievement).toEqual(expectedAchievement)
    expect(prisma.achievement.create).toHaveBeenCalledWith({
      data: newAchievementData,
    })
  })

  test('findAchievementById should return an achievement', async () => {
    const achievementId = '1'
    const expectedAchievement = {
      achievement_id: achievementId,
      name: 'First Achievement',
      description: 'Achieved something important',
    }

    const achievement =
      await achievementService.findAchievementById(achievementId)

    expect(achievement).toEqual(expectedAchievement)
    expect(prisma.achievement.findUnique).toHaveBeenCalledWith({
      where: { achievement_id: achievementId },
    })
  })

  test('findAchievementByProfessionalInfoId should return achievements for a given professional info ID', async () => {
    const professionalInfoId = 'info1'
    const expectedAchievements = [
      {
        achievement_id: '1',
        professional_info_id: professionalInfoId,
        name: 'First Achievement',
        description: 'Achieved something important',
      },
      {
        achievement_id: '3',
        professional_info_id: professionalInfoId,
        name: 'Third Achievement',
        description: 'Achieved yet another thing',
      },
    ]

    const achievements =
      await achievementService.findAchievementByProfessionalInfoId(
        professionalInfoId,
      )

    expect(achievements).toEqual(expectedAchievements)
    expect(prisma.achievement.findMany).toHaveBeenCalledWith({
      where: { professional_info_id: professionalInfoId },
    })
  })

  test('getAllAchievements should return all achievements', async () => {
    const expectedAchievements = [
      {
        achievement_id: '1',
        name: 'First Achievement',
        description: 'Achieved something important',
      },
      {
        achievement_id: '2',
        name: 'Second Achievement',
        description: 'Achieved another thing',
      },
    ]

    const achievements = await achievementService.getAllAchievements()

    expect(achievements).toEqual(expectedAchievements)
    expect(prisma.achievement.findMany).toHaveBeenCalledWith()
  })
})
