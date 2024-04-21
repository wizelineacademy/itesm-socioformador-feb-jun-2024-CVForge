import prisma from '@/lib/prisma';
import { Certificate } from '@/types/certificate';

const findCertificateById = async (certificateId: string) => {
    const certificate = await prisma.certificate.findUnique({
        where: { certificate_id: certificateId }
    });

    return certificate;
}

const getAllCertificates = async() => {
    const certificate = await prisma.certificate.findMany();
    return certificate;
}

const createCertificate = async (certificateData: Certificate) => {
    const certificate = await prisma.certificate.create({
        data: {
            ...certificateData
        }
    });

    return certificate;
}