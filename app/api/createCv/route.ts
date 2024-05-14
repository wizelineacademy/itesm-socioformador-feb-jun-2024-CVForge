import { exec } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { MOCK_PROFESSIONAL_INFO } from '../../(cv)/insight/[cv_id]/CONSTANTS';

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const data = req.body;
        const cvData = JSON.stringify(MOCK_PROFESSIONAL_INFO);
        const jobPosition = "Data Engineer";
        const result = await new Promise((resolve, reject) => {
            exec(`python3 scripts/cv_generation.py ${cvData} '${jobPosition}'`, (error, stdout, stderr) => {
                if (error) {
                    console.log("Execution error:", error);
                    reject(new Error('Error executing Python script: ' + error.message));
                    return;
                }
                if (stderr) {
                    console.log("Script error output:", stderr);
                    reject(new Error('Python script reported an error: ' + stderr));
                    return;
                }
                resolve(stdout.trim());
            });
        });
        console.log("------", data)

        return NextResponse.json({ message: "CV processed successfully", results: result });
    } catch (error) {
        console.error("Error in Python script execution:", error);
        return NextResponse.json({ error: error.message });
    }
}
