import { exec } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { MOCK_PROFESSIONAL_INFO } from "../../(cv)/cv/[cv_id]/CONSTANTS";
import {generate_recommendations} from "@/scripts/insight_generation";


import { MOCK_CV } from '../../(cv)/cv/[cv_id]/CONSTANTS';

/* export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        // Pass MOCK_CV data to the Python script as a command line argument
        const cvData = JSON.stringify(MOCK_CV)
        const jobPosition = "Data Engineer";
        // console.log(cvData);
        const result = await new Promise((resolve, reject) => {
            exec(`python3 scripts/insight_generation.py ${cvData} '${jobPosition}'`, (error, stdout, stderr) => {
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

/* export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
      // Extract data from the request
      const data = req.body;
      const cvData = JSON.stringify(MOCK_PROFESSIONAL_INFO);
      const jobPosition = "Data Engineer";
  
      // Call the generateCV function
      const result = await generate_recommendations(cvData, jobPosition);
  
      // Return the parsed results as a JSON response
      return NextResponse.json({
        message: "CV processed successfully",
        results: result,
      });
    } catch (error) {
      console.error("Error in JavaScript script execution:", error);
      return NextResponse.json({ error: error.message });
    }
  }*/

  export async function GET(req: NextRequest): Promise<NextResponse> {
      try {
          // Use MOCK_CV data directly with the JavaScript function
          const cvData = MOCK_PROFESSIONAL_INFO;
          const jobPosition = "Data Engineer";

        const result = await generate_recommendations(cvData, jobPosition);
  
          return NextResponse.json({ message: result });
      } catch (error: any) {
          console.error("Error in generating recommendations:", error);
          return NextResponse.json({ error: error.message });
      }
    }
  
