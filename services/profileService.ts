// profileService.ts
"use server";

import prisma from '@/lib/prisma';

export const findProfileById = async (profileId: string) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { profile_id: profileId },
    });
    return profile;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return null;
  }
};

export const getAllProfiles = async () => {
  try {
    const profiles = await prisma.profile.findMany();
    return profiles;
  } catch (error) {
    console.error('Failed to fetch all profiles:', error);
    return [];
  }
};

export const createProfile = async (data: {
  user_id?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  github_link?: string;
  linkedin_link?: string;
  location?: string;
  birthdate?: Date;
  gender?: string;
}) => {
  try {
    const newProfile = await prisma.profile.create({
      data,
    });
    return newProfile;
  } catch (error) {
    console.error('Failed to create profile:', error);
    return null;
  }
};

export const updateProfile = async (profileId: string, data: {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  github_link?: string;
  linkedin_link?: string;
  location?: string;
  birthdate?: Date;
  gender?: string;
}) => {
  try {
    const updatedProfile = await prisma.profile.update({
      where: { profile_id: profileId },
      data,
    });
    return updatedProfile;
  } catch (error) {
    console.error('Failed to update profile:', error);
    return null;
  }
};

export const deleteProfile = async (profileId: string) => {
  try {
    const deletedProfile = await prisma.profile.delete({
      where: { profile_id: profileId },
    });
    return deletedProfile;
  } catch (error) {
    console.error('Failed to delete profile:', error);
    return null;
  }
};
