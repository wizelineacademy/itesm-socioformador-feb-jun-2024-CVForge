import { exec } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { MOCK_PROFESSIONAL_INFO } from '../../(cv)/insight/[cv_id]/CONSTANTS';

type ParsedObject = {
    [key: string]: { [key: string]: string | number | string[] }
};

// Function to parse text into an object structure
function parseTextToObject(text: string): ParsedObject {
    // Split the text into sections based on 'Section: ' keyword
    const sections = text.split('Section: ').filter(Boolean);
    const result: ParsedObject = {};

    // Iterate over each section to parse its content
    sections.forEach(section => {
        const [header, content] = section.split('\nContent: ');
        if (!content) return;

        // Parse the content into key-value pairs
        const parsedContent = content
            .replace(/[{}]/g, '') // Remove curly braces
            .split(',')
            .reduce((acc, item) => {
                const [key, ...valueParts] = item.split(':').map(str => str.trim());
                const value = valueParts.join(':');

                if (!key || !value) return acc;

                // Attempt to parse numbers
                const numberValue = parseFloat(value);
                if (!isNaN(numberValue) && !value.includes(',')) {
                    acc[key] = numberValue;
                } else if (value.includes(',')) {
                    // Split tags into an array if they contain a comma
                    acc[key] = value.split(', ').map(tag => tag.trim());
                } else {
                    acc[key] = value;
                }
                return acc;
            }, {} as { [key: string]: string | number | string[] });

        // Join the elements into a single string separated by commas
        const joinedContent = Object.entries(parsedContent)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
            .join(', ');

        result[header.trim()] = { "content": joinedContent };
    });

    return result;
}

function convertToMarkdown(data) {
    let markdown = '';

    for (const [section, contents] of Object.entries(data)) {
        markdown += `# ${section}\n`;
        for (const [key, value] of Object.entries(contents)) {
            markdown += `## ${value}\n`;
        }
    }

    return markdown;
}


// Handle POST requests
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Extract data from the request
        const data = req.body;
        const cvData = JSON.stringify(MOCK_PROFESSIONAL_INFO);
        const jobPosition = "Data Engineer";

        // Execute a Python script with the given parameters
        const result: string = await new Promise((resolve, reject) => {
            exec(`python3 scripts/cv_generation.py ${cvData} "${jobPosition}"`, (error, stdout, stderr) => {
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

        // Parse the received unparsed text to the appropriate string format
        const pattern: RegExp = /Section: (\w+)\s+Content: ({[\s\S]*?})/g;
        let match1: RegExpExecArray | null;
        let parsedText = "";
        while ((match1 = pattern.exec(result)) !== null) {
            const [, section, content] = match1;
            parsedText += (`Section: ${section}\nContent: ${content}\n`);
        }

        // Convert the parsed text to an object
        const parsedTextToObject = parseTextToObject(parsedText);

        // Convert the object to markdown
        const markdown = convertToMarkdown(parsedTextToObject);

        // Return the parsed results as a JSON response
        return NextResponse.json({ message: "CV processed successfully", results: markdown });
    } catch (error) {
        console.error("Error in Python script execution:", error);
        return NextResponse.json({ error: error.message });
    }
}
