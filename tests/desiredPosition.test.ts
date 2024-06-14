import prisma from '@/lib/prisma';
import desiredPositionService from '@/services/desiredPositionService';
import { expect } from '@jest/globals';

jest.mock('@/lib/prisma', () => ({
    desired_position: {
        findUnique: jest.fn().mockImplementation((query) => {
            if (query.where.desired_position_id === 'dp1') {
                return Promise.resolve({ desired_position_id: 'dp1', title: 'Senior Developer', description: 'Develop high quality software' });
            } else {
                return Promise.resolve(null);
            }
        }),
        findMany: jest.fn().mockImplementation(() => {
            return Promise.resolve([
                { desired_position_id: 'dp1', title: 'Senior Developer', description: 'Develop high quality software' },
                { desired_position_id: 'dp2', title: 'Project Manager', description: 'Manage software development projects' }
            ]);
        }),
        create: jest.fn().mockImplementation((data) => Promise.resolve({ desired_position_id: 'dp3', ...data.data })),
    },
}));

describe('DesiredPosition Services', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('findDesiredPositionById should return a desired position', async () => {
        const desiredPositionId = 'dp1';
        const expectedDesiredPosition = {
            desired_position_id: desiredPositionId,
            title: 'Senior Developer',
            description: 'Develop high quality software'
        };

        const desiredPosition = await desiredPositionService.findDesiredPositionById(desiredPositionId);

        expect(desiredPosition).toEqual(expectedDesiredPosition);
        expect(prisma.desired_position.findUnique).toHaveBeenCalledWith({
            where: { desired_position_id: desiredPositionId },
        });
    });

    test('getAllDesiredPosition should return all desired positions', async () => {
        const expectedDesiredPositions = [
            { desired_position_id: 'dp1', title: 'Senior Developer', description: 'Develop high quality software' },
            { desired_position_id: 'dp2', title: 'Project Manager', description: 'Manage software development projects' }
        ];

        const desiredPositions = await desiredPositionService.getAllDesiredPosition();

        expect(desiredPositions).toEqual(expectedDesiredPositions);
        expect(prisma.desired_position.findMany).toHaveBeenCalledWith();
    });

    test('createDesiredPosition should add a new desired position', async () => {
        const newDesiredPositionData = {
            desired_position_id: 'dp3',
            title: 'Lead QA',
            description: 'Oversee all quality assurance processes'
        };

        const expectedDesiredPosition = {
            desired_position_id: 'dp3', // Mock the expected return including an auto-generated ID
            ...newDesiredPositionData
        };

        const desiredPosition = await desiredPositionService.createDesiredPosition(newDesiredPositionData);

        expect(desiredPosition).toEqual(expectedDesiredPosition);
        expect(prisma.desired_position.create).toHaveBeenCalledWith({
            data: newDesiredPositionData,
        });
    });
});
