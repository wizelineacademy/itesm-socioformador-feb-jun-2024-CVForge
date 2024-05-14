import { exec } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { MOCK_CV } from '../../(cv)/insight/[cv_id]/CONSTANTS';

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const data = req.body;

        return NextResponse.json({ message: "CV processed successfully", results: data });
    } catch (error) {
        console.error("Error in Python script execution:", error);
        return NextResponse.json({ error: error.message });
    }
}
