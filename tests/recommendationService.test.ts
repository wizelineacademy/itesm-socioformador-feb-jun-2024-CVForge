import prisma from '@/lib/prisma';
import {createRecommendation, findRecommendationById, findRecommendationsByCvId, getAllRecommendation} from '@/services/recommendationService';
import { recommendation } from '@prisma/client';
import { expect } from '@jest/globals';

// Type-safe mock setup
jest.mock('@/lib/prisma', () => ({
  recommendation: {
    findUnique: jest.fn().mockImplementation((query) => {
      if (query.where.recommendation_id === '1') {
        return Promise.resolve({ recommendation_id: '1', title: 'Sample Title', main_content: 'Content here' });
      } else {
        return Promise.resolve(null);
      }
    }),
    findMany: jest.fn().mockImplementation((options = {}) => {
      const { where } = options;
      if (where && where.cv_id === '123') {
        return Promise.resolve([
          { recommendation_id: '1', cv_id: "123", title: 'Sample Title', main_content: 'Content here', completed: false },
          { recommendation_id: '2', cv_id: "123", title: 'Another Title', main_content: 'More content here', completed: true }
        ]);
      } else if (where && where.cv_id !== "123") {
        return Promise.resolve([]);
      } else {
        return Promise.resolve([
          // Return all mock recommendations here, as it simulates no filtering being applied
          { recommendation_id: '1', cv_id: "123", title: 'Sample Title', main_content: 'Content here', completed: false },
          { recommendation_id: '2', cv_id: "123", title: 'Another Title', main_content: 'More content here', completed: true }
        ]);
      }
    }),
    create: jest.fn().mockImplementation((data) => Promise.resolve({ recommendation_id: '1', ...data.data })),
  },
}));

describe('Recommendation Services', () => {
  afterEach(() => {
    jest.clearAllMocks();
    // jest.resetAllMocks();
  });

  test('createRecommendation should add a new recommendation', async () => {
    const newRecommendationData = {
      recommendation_id: "1",
      cv_id: "123",
      title: 'New Title',
      main_content: 'New content',
      completed: true
    };

    const expectedRecommendation = {
      recommendation_id: '1',
      ...newRecommendationData
    };

    // Call the function under test
    const recommendation = await createRecommendation(newRecommendationData);

    // Assertions to check both the result and the call to the Prisma create method
    expect(recommendation).toEqual(expectedRecommendation);
    expect(prisma.recommendation.create).toHaveBeenCalledWith({
      data: newRecommendationData,
    });
  });

  test('findRecommendationById should return a recommendation', async () => {
    const mockRecommendationId = '1';
    const mockRecommendation = { recommendation_id: mockRecommendationId, title: 'Sample Title', main_content: 'Content here' };

    const createdRecommendation = await createRecommendation(mockRecommendation);

    // Perform the function call
    const recommendation = await findRecommendationById(mockRecommendationId);

    // Check that the returned value matches the expected mock value
    expect(recommendation).toEqual(mockRecommendation);
    // Verify the method was called correctly
    expect((prisma.recommendation.findUnique)).toHaveBeenCalledWith({
      where: { recommendation_id: mockRecommendationId },
    });
  });

  test('findRecommendationsByCvId should return all recommendations for a given CV', async () => {
    const mockCvId = '123';
    const mockRecommendations = [
      { recommendation_id: '1', cv_id: mockCvId, title: 'Sample Title', main_content: 'Content here', completed: false },
      { recommendation_id: '2', cv_id: mockCvId, title: 'Another Title', main_content: 'More content here', completed: true }
    ];

    mockRecommendations.forEach(async (recommendation) => {
      await createRecommendation(recommendation)
    })

    const recommendations = await findRecommendationsByCvId(mockCvId);

    // Check that the returned value matches the expected mock value
    expect(recommendations).toEqual(mockRecommendations);
    // Verify the method was called correctly
    expect(prisma.recommendation.findMany).toHaveBeenCalledWith({
      where: { cv_id: mockCvId },
    });
  });  

  
  test('getAllRecommendations should return all recommendations', async () => {
    const mockCvId = '123';
    const mockRecommendations = [
      { recommendation_id: '1', cv_id: mockCvId, title: 'Sample Title', main_content: 'Content here', completed: false },
      { recommendation_id: '2', cv_id: mockCvId, title: 'Another Title', main_content: 'More content here', completed: true }
    ];

    mockRecommendations.forEach(async (recommendation) => {
      await createRecommendation(recommendation)
    })

    const recommendations = await getAllRecommendation();

    // Check that the returned value matches the expected mock value
    expect(recommendations).toEqual(mockRecommendations);
    // Verify the method was called correctly
    expect(prisma.recommendation.findMany).toHaveBeenCalledWith();
  });
  
});
