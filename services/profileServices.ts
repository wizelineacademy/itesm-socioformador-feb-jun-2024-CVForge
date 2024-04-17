import prisma from '@/lib/prisma';
import { Profile} from '@/types/profile';

const findProfileById = async (profileId: string) =>{
    const profile = await prisma.profile.findUnique({
        where: { profile_id: profileId },
    });
    return profile;
}

const createProfile = async (profileData: Profile) => {
    const profile = await prisma.profile.create({
        data: {
            ...profileData,
        },
    });
    return profile;
}

const getllAllProfiles = async () => {
    const profile = await prisma.profile.findMany();
    return profile;
}

export default {
    findProfileById,
    createProfile,
    getllAllProfiles
}