import prisma from '@/lib/prisma';
import recommendationServices from '@/services/recommendationService';

// Type-safe mock setup
jest.mock('../lib/prisma', () => ({
  recommendation: {
    // findUnique: jest.fn().mockResolvedValue(null),
    // findFirst: jest.fn().mockResolvedValue(null),
    // findMany: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue(null),
  },
}));

describe('Recommendation Services', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createRecommendation should add a new recommendation', async () => {
    const newRecommendationData = { title: 'New Title', main_content: 'New content' };
    const mockRecommendation = { recommendation_id: '3', ...newRecommendationData };
    prisma.recommendation.create({data: {...mockRecommendation}});

    const recommendation = await recommendationServices.createRecommendation(newRecommendationData);
    expect(recommendation).equal(mockRecommendation);
    expect(prisma.recommendation.create).to.have.been.calledWith({
      data: newRecommendationData,
    });
  });

//   test('findRecommendationById should return a recommendation', async () => {
//     const mockRecommendationId = '1';
//     const mockRecommendation = { recommendation_id: mockRecommendationId, title: 'Sample Title', main_content: 'Content here' };
  
//     // Correctly mock the `findUnique` method
//     prisma.recommendation.findUnique({where : {recommendation_id: mockRecommendation.recommendation_id}});
  
//     const recommendation = await recommendationServices.findRecommendationById(mockRecommendationId);
//     expect(recommendation).equal(mockRecommendation); // Use `toEqual` for object equality check
//     expect(prisma.recommendation.findUnique).to.have.been.calledWith({
//       where: { recommendation_id: mockRecommendationId },
//     });
//   });
  
//   test('findRecommendationsByCvId should return the first recommendation for a given CV', async () => {
//     const mockCvId = 'cv1';
//     const mockRecommendation = { recommendation_id: '1', cv_id: mockCvId, title: 'Sample Title', main_content: 'Content here' };
//     prisma.recommendation.findFirst.mockResolvedValue(mockRecommendation);

//     const recommendation = await recommendationServices.findRecommendationsByCvId(mockCvId);
//     expect(recommendation).equal(mockRecommendation);
//     expect(prisma.recommendation.findFirst).to.have.been.calledWith({
//       where: { cv_id: mockCvId },
//     });
//   });

//   test('getAllRecommendations should return all recommendations', async () => {
//     const mockRecommendations = [
//       { recommendation_id: '1', title: 'Sample Title 1', main_content: 'Content here 1' },
//       { recommendation_id: '2', title: 'Sample Title 2', main_content: 'Content here 2' }
//     ];
//     prisma.recommendation.findMany.mockResolvedValue(mockRecommendations);

//     const recommendations = await recommendationServices.getAllRecommendation();
//     expect(recommendations).equal(mockRecommendations);
//     expect(prisma.recommendation.findMany).toHaveBeenCalled();
//   });

});
