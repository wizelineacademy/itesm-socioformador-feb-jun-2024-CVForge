// educationService.test.ts
import educationService from '@/services/educationService';
import prisma from '@/lib/prisma';

// Mock de las funciones de Prisma
jest.mock('@/lib/prisma', () => ({
  education: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));

describe('educationService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findEducationById', () => {
    it('should return education when found', async () => {
      const mockEducation = { education_id: '1', name: 'Test Education' };
      (prisma.education.findUnique as jest.Mock).mockResolvedValue(mockEducation);

      const result = await educationService.findEducationById('1');

      expect(prisma.education.findUnique).toHaveBeenCalledWith({
        where: { education_id: '1' },
      });
      expect(result).toEqual(mockEducation);
    });

    it('should return null when not found', async () => {
      (prisma.education.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await educationService.findEducationById('1');

      expect(prisma.education.findUnique).toHaveBeenCalledWith({
        where: { education_id: '1' },
      });
      expect(result).toBeNull();
    });
  });

});
