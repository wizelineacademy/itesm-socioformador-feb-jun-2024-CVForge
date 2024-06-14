import prisma from '@/lib/prisma';
import { findProfileById, getAllProfiles, createProfile, updateProfile, deleteProfile } from '@/services/profileService';
import { expect } from '@jest/globals';

jest.mock('@/lib/prisma', () => ({
    profile: {
        findUnique: jest.fn().mockImplementation((query) => {
            if (query.where.profile_id === 'profile1') {
                return Promise.resolve({ profile_id: 'profile1', email: 'user@example.com' });
            } else {
                return Promise.resolve(null);
            }
        }),
        findMany: jest.fn().mockImplementation(() => {
            return Promise.resolve([
                { profile_id: 'profile1', email: 'user1@example.com' },
                { profile_id: 'profile2', email: 'user2@example.com' }
            ]);
        }),
        create: jest.fn().mockImplementation((data) => Promise.resolve({ profile_id: 'newProfile', ...data.data })),
        update: jest.fn().mockImplementation((query) => {
            if (query.where.profile_id === 'profile1') {
                return Promise.resolve({ profile_id: 'profile1', ...query.data });
            } else {
                return Promise.resolve(null);
            }
        }),
        delete: jest.fn().mockImplementation((query) => {
            if (query.where.profile_id === 'profile1') {
                return Promise.resolve({ profile_id: 'profile1', email: 'deleted@example.com' });
            } else {
                return Promise.resolve(null);
            }
        }),
    }
}));

describe('Profile Service Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('findProfileById should fetch a profile by ID', async () => {
        const profileId = 'profile1';
        const expectedProfile = { profile_id: profileId, email: 'user@example.com' };

        const profile = await findProfileById(profileId);

        expect(profile).toEqual(expectedProfile);
        expect(prisma.profile.findUnique).toHaveBeenCalledWith({
            where: { profile_id: profileId },
        });
    });

    test('getAllProfiles should return all profiles', async () => {
        const expectedProfiles = [
            { profile_id: 'profile1', email: 'user1@example.com' },
            { profile_id: 'profile2', email: 'user2@example.com' }
        ];

        const profiles = await getAllProfiles();

        expect(profiles).toEqual(expectedProfiles);
        expect(prisma.profile.findMany).toHaveBeenCalledWith();
    });

    test('createProfile should add a new profile', async () => {
        const newProfileData = {
            email: 'newuser@example.com',
            first_name: 'New',
            last_name: 'User',
        };

        const expectedProfile = {
            profile_id: 'newProfile', 
            ...newProfileData
        };

        const profile = await createProfile(newProfileData);

        expect(profile).toEqual(expectedProfile);
        expect(prisma.profile.create).toHaveBeenCalledWith({
            data: newProfileData,
        });
    });

    test('updateProfile should update an existing profile', async () => {
        const profileId = 'profile1';
        const updateData = {
            email: 'updated@example.com',
            phone: '1234567890',
        };

        const expectedProfile = {
            profile_id: profileId,
            ...updateData
        };

        const profile = await updateProfile(profileId, updateData);

        expect(profile).toEqual(expectedProfile);
        expect(prisma.profile.update).toHaveBeenCalledWith({
            where: { profile_id: profileId },
            data: updateData,
        });
    });

    test('deleteProfile should delete a profile and return it', async () => {
        const profileId = 'profile1';
        const expectedProfile = { profile_id: profileId, email: 'deleted@example.com' };

        const profile = await deleteProfile(profileId);

        expect(profile).toEqual(expectedProfile);
        expect(prisma.profile.delete).toHaveBeenCalledWith({
            where: { profile_id: profileId },
        });
    });
});
