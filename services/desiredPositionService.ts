import prisma from '@/lib/prisma';

const findDesiredPositionById = async (desiredPositionId: string) => {
    const desiredPosition = await prisma.desired_position.findUnique({
        where: { desired_position_id: desiredPositionId}
    });

    return desiredPosition;
}

const getAllDesiredPosition = async() => {
    const desiredPosition = await prisma.desired_position.findMany();
    return desiredPosition;
}

const createDesiredPosition = async (desiredPositionData: DesiredPosition) => {
    const desiredPosition = await prisma.desired_position.create({
        data: {
            ...desiredPositionData,
        }
    });
    return desiredPosition;
}

export default {
    findDesiredPositionById,
    getAllDesiredPosition,
    createDesiredPosition
}