import prisma from '@/lib/prisma';
import { CV } from '@/types/cv';

const findCVById = async (cvId: string) => {
    const cv = await prisma.cv.findUnique({
        where: { cv_id: cvId },
    });

    return cv;
}

const getAllCv = async() => {
    const cv = await prisma.cv.findMany();
    return cv;
}

const createCV = async (cvData: CV) => {
    const cv = await prisma.cv.create({
        data: {
            ...cvData,
        },
    });
    return cv;
}

export default {
    findCVById,
    createCV,
    getAllCv
}