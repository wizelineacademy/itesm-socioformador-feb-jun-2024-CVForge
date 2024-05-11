import { exec } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { MOCK_CV } from '../../(cv)/insight/[cv_id]/CONSTANTS';

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        // Pass MOCK_CV data to the Python script as a command line argument
        const cvData = JSON.stringify(MOCK_CV)
        const jobPosition = "Data Engineer";
//        console.log(cvData);
        const result = await new Promise((resolve, reject) => {
            exec(`python3 scripts/ai_test.py ${cvData} '${jobPosition}'`, (error, stdout, stderr) => {
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
        return NextResponse.json({ message: result });
    } catch (error: any) {
        console.error("Error in Python script execution:", error);
        return NextResponse.json({ error: error.message });
    }
}
