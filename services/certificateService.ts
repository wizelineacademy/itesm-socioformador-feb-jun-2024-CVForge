import prisma from '@/lib/prisma';
import { Certificate } from '@/types/certificate';
import { Prisma } from '@prisma/client';

const createCertificate = async (certificateData: Prisma.certificateCreateInput) => {
    const certificate = await prisma.certificate.create({
        data: certificateData
    });

    return certificate;
}

const findCertificateById = async (certificateId: string) => {
    const certificate = await prisma.certificate.findUnique({
        where: { certificate_id: certificateId }
    });

    return certificate;
}

const findCertificateByProfessionalInfoId = async (professionalInfoId: string) => {
    const certificates = await prisma.certificate.findMany({
        where: { professional_info_id: professionalInfoId }
        // where: {professional_info: {professional_info_id: professionalInfoId}}
    })
    return certificates
}

const getAllCertificates = async () => {
    const certificate = await prisma.certificate.findMany();
    return certificate;
}

export default {
    createCertificate,
    findCertificateById,
    findCertificateByProfessionalInfoId,
    getAllCertificates
}