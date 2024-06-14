import prisma from '@/lib/prisma';
import { getUserIdByEmail, getProfessionalByEmail, checkIfEmailInUse } from '@/services/sessionService';
import { expect } from '@jest/globals';

jest.mock('@/lib/prisma', () => ({
    users: {
        findFirst: jest.fn().mockImplementation((query) => {
            if (query.where.email === 'example@example.com') {
                return Promise.resolve({ users_id: 'user1', email: 'example@example.com' });
            } else {
                return Promise.resolve(null);
            }
        }),
        count: jest.fn().mockImplementation((query) => {
            if (query.where.email === 'used@example.com') {
                return Promise.resolve(1); // Indicates the email is in use
            } else {
                return Promise.resolve(0); // Email not in use
            }
        }),
    },
    professional_info: {
        findFirst: jest.fn().mockImplementation((query) => {
            if (query.where.user_id === 'user1') {
                return Promise.resolve({ professional_info_id: 'prof1', user_id: 'user1' });
            } else {
                return Promise.resolve(null);
            }
        })
    }
}));

describe('User Services', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getUserIdByEmail should return the user ID for a given email', async () => {
        const userEmail = 'example@example.com';
        const expectedUserId = 'user1';

        const userId = await getUserIdByEmail(userEmail);

        expect(userId).toEqual(expectedUserId);
        expect(prisma.users.findFirst).toHaveBeenCalledWith({
            where: { email: userEmail },
        });
    });

    test('checkIfEmailInUse should return 1 if email is in use', async () => {
        const userEmail = 'used@example.com';
        const expectedCount = 1;

        const count = await checkIfEmailInUse(userEmail);

        expect(count).toEqual(expectedCount);
        expect(prisma.users.count).toHaveBeenCalledWith({
            where: { email: userEmail },
        });
    });

    test('getProfessionalByEmail should return the professional info ID for a given user email', async () => {
        const userEmail = 'example@example.com';
        const expectedProfessionalInfoId = 'prof1';

        const professionalInfoId = await getProfessionalByEmail(userEmail);

        expect(professionalInfoId).toEqual(expectedProfessionalInfoId);
        expect(prisma.users.findFirst).toHaveBeenCalledWith({
            where: { email: userEmail },
        });
        expect(prisma.professional_info.findFirst).toHaveBeenCalledWith({
            where: { user_id: 'user1' },
        });
    });
});
