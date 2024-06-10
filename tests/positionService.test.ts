import prisma from '@/lib/prisma';
import * as positionServices from '@/services/positionServices';
import { expect } from '@jest/globals';

// Mock the prisma client
jest.mock('@/lib/prisma', () => ({
  desired_position: {
    findMany: jest.fn(),
  },
}));

describe('Position Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllPositions should return all positions', async () => {
    // Mock positions data
    const mockPositions = [
      { id: '1', title: 'Software Engineer' },
      { id: '2', title: 'Data Scientist' },
    ];

    // Mock the Prisma client function to resolve with mock positions
    (prisma.desired_position.findMany as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockPositions)
    );

    // Call the function under test
    const positions = await positionServices.getAllPositions();

    // Assertions
    expect(positions).toEqual(mockPositions);
    expect(prisma.desired_position.findMany).toHaveBeenCalledWith();
  });
});
