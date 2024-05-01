import prisma from '@/lib/prisma';
import certificateService from '@/services/certificateService';
import { expect } from '@jest/globals';

// Mocking the prisma certificate model methods
jest.mock('@/lib/prisma', () => ({
    certificate: {
        create: jest.fn().mockImplementation(data => Promise.resolve({ certificate_id: '1', ...data.data })),
        findUnique: jest.fn().mockImplementation(query => {
            if (query.where.certificate_id === '1') {
                return Promise.resolve({ certificate_id: '1', name: 'Certification in Testing', issued_by: 'Certification Body', professional_info_id: 'abc123' });
            } else {
                return Promise.resolve(null);
            }
        }),
        findMany: jest.fn().mockImplementation((options = {}) => {
            const { where } = options;
            if (where && where.professional_info_id ) {
                // Return certificates for a specific professional_info_id
                return Promise.resolve([
                    { certificate_id: '2', professional_info_id: where.professional_info_id, name: 'Advanced Testing', issued_by: 'Advanced Body' }
                ]);
            } else if (where && !where.professional_info_id) {
                // If professional_info_id is explicitly queried but not matched
                return Promise.resolve([]);
            } else {
                // Default case: return all certificates when no specific filter is applied
                return Promise.resolve([
                    { certificate_id: '1', name: 'Certification in Testing', issued_by: 'Certification Body', professional_info_id: 'abc123' },
                    { certificate_id: '2', name: 'Advanced Testing', issued_by: 'Advanced Body', professional_info_id: 'def456' }
                ]);
            }
        }),
    }
}));

describe('Certificate Services', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('createCertificate should add a new certificate', async () => {
        const certificateId = "1";
        const newCertificateData = {
            certificate_id: certificateId,
            name: 'Certification in Testing',
            issued_by: 'Certification Body',
            professional_info_id: 'abc123'
        };

        const expectedCertificate = {
            ...newCertificateData
        };

        const certificate = await certificateService.createCertificate(newCertificateData);

        expect(certificate).toEqual(expectedCertificate);
        expect(prisma.certificate.create).toHaveBeenCalledWith({
            data: newCertificateData,
        });
    });

    test('findCertificateById should return a certificate', async () => {
        const certificateId = '1';
        const expectedCertificate = {
            certificate_id: certificateId,
            name: 'Certification in Testing',
            issued_by: 'Certification Body',
            professional_info_id: 'abc123'
        };

        const certificate = await certificateService.findCertificateById(certificateId);

        expect(certificate).toEqual(expectedCertificate);
        expect(prisma.certificate.findUnique).toHaveBeenCalledWith({
            where: { certificate_id: certificateId },
        });
    });

    test('findCertificateByProfessionalInfoId should return certificates for a given professional info ID', async () => {
        const professionalInfoId = 'abc123';
        const expectedCertificates = [
            { certificate_id: '2', professional_info_id: professionalInfoId, name: 'Advanced Testing', issued_by: 'Advanced Body' }
        ];

        const certificates = await certificateService.findCertificateByProfessionalInfoId(professionalInfoId);

        expect(certificates).toEqual(expectedCertificates);
        expect(prisma.certificate.findMany).toHaveBeenCalledWith({
            where: { professional_info_id: professionalInfoId }
        });
    });

    test('getAllCertificates should return all certificates', async () => {
        const expectedCertificates = [
            { certificate_id: '1', name: 'Certification in Testing', issued_by: 'Certification Body', professional_info_id: 'abc123' },
            { certificate_id: '2', name: 'Advanced Testing', issued_by: 'Advanced Body', professional_info_id: 'def456' }
        ];

        const certificates = await certificateService.getAllCertificates();

        expect(certificates).toEqual(expectedCertificates);
        expect(prisma.certificate.findMany).toHaveBeenCalledWith();
    });
});
