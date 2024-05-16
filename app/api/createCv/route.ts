import { exec } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { MOCK_PROFESSIONAL_INFO } from '../../(cv)/cv/[cv_id]/CONSTANTS';

// Function to escape JSON string for shell
function escapeShellArg(arg: string): string {
    return "'" + arg.replace(/'/g, "'\\''") + "'";
}


// Handle POST requests
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Extract data from the request
        const data = req.body;
        const cvData = JSON.stringify(MOCK_PROFESSIONAL_INFO);
        const jobPosition = "Data Engineer";

        // Escape the JSON string for shell
        const escapedCvData = escapeShellArg(cvData);

        // Execute a Python script with the given parameters
        const result: string = await new Promise((resolve, reject) => {
            exec(`python3 scripts/cv_generation.py ${escapedCvData} ${jobPosition}`, (error, stdout, stderr) => {
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
                resolve(stdout);
            });
        });

        // Return the parsed results as a JSON response
        return NextResponse.json({ message: "CV processed successfully", results: result });
    } catch (error) {
        console.error("Error in Python script execution:", error);
        return NextResponse.json({ error: error.message });
    }
}
