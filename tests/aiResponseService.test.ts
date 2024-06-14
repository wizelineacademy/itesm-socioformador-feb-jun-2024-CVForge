import prisma from '@/lib/prisma';
import aiResponseService from '@/services/aiResponseService';
import { expect } from '@jest/globals';

jest.mock('@/lib/prisma', () => ({
    ai_response: {
        findUnique: jest.fn().mockImplementation((query) => {
            if (query.where.ai_response_id === '1') {
                return Promise.resolve({ ai_response_id: '1', plain_text: 'Sample AI response text' });
            } else {
                return Promise.resolve(null);
            }
        }),
        findMany: jest.fn().mockImplementation(() => {
            return Promise.resolve([
                { ai_response_id: '1', plain_text: 'Sample AI response text' },
                { ai_response_id: '2', plain_text: 'Another AI response text' }
            ]);
        }),
        create: jest.fn().mockImplementation((data) => Promise.resolve({ ai_response_id: '3', ...data.data }))
    },
}));

describe('AI Response Services', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('findAIResponseByID should return an AI response by ID', async () => {
        const aiResponseId = '1';
        const expectedAIResponse = {
            ai_response_id: aiResponseId,
            plain_text: 'Sample AI response text'
        };

        const aiResponse = await aiResponseService.findAIResponseByID(aiResponseId);

        expect(aiResponse).toEqual(expectedAIResponse);
        expect(prisma.ai_response.findUnique).toHaveBeenCalledWith({
            where: { ai_response_id: aiResponseId }
        });
    });

    test('getAllAIResponse should return all AI responses', async () => {
        const expectedAIResponses = [
            { ai_response_id: '1', plain_text: 'Sample AI response text' },
            { ai_response_id: '2', plain_text: 'Another AI response text' }
        ];

        const aiResponses = await aiResponseService.getAllAIResponse();

        expect(aiResponses).toEqual(expectedAIResponses);
        expect(prisma.ai_response.findMany).toHaveBeenCalledWith();
    });

    test('createAIResponse should add a new AI response', async () => {
        const newAIResponseData = {
            ai_response_id: '3',
            plain_text: 'New AI response text'
        };

        const expectedAIResponse = {
            ai_response_id: '3', // Assume an auto-generated ID
            ...newAIResponseData
        };

        const aiResponse = await aiResponseService.createAIResponse(newAIResponseData);

        expect(aiResponse).toEqual(expectedAIResponse);
        expect(prisma.ai_response.create).toHaveBeenCalledWith({
            data: newAIResponseData
        });
    });
});
