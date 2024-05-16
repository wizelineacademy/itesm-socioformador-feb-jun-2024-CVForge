// scripts/cv_generation.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

// Function to parse the data
function parseData(objStr) {
  objStr = objStr.trim().slice(1, -1);

  const categoryRegex = /(\w+):(\[\{.*?\}\])(?=,\w+:|$)/g;
  let matches;
  const categories = {};

  while ((matches = categoryRegex.exec(objStr)) !== null) {
    const category = matches[1];
    let content = matches[2];
    content = content.slice(1, -1);
    categories[category] = content;
  }

  return categories;
}

// Function to generate CV using OpenAI
async function generateCV(cvData, jobPosition) {
  const parsedData = parseData(cvData);
  try {
    let prompt = `I will provide information about various sections of a professional's profile. Your task is to select the most relevant content for the job position: '${jobPosition}'. Each section includes different types of information such as education, skills, achievements, work experience, and certifications. Here is the provided information:\n\n`;

    for (const [section, content] of Object.entries(parsedData)) {
      prompt += `Section: ${
        section.charAt(0).toUpperCase() + section.slice(1)
      }\nContent (can contain multiple elements): ${content}\n\n`;
    }

    prompt += `Based on the information provided, select only the sections and their content that are most relevant for the job position: '${jobPosition}'. You must return it in markdown format and include all possible content that fits the job position, like the following: <h2>Section</h2>, <h3>Content</h3>, <h3>Content</h3>. Do not modify any of the content. If necessary, use many Content fields. Do not return the content in curly braces. Return only the selected sections and their corresponding content. DO NOT ADD INFORMATION THAT WAS NOT PROVIDED TO YOU`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const recommendations = response.choices[0].message.content.trim();
    return recommendations;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return "";
  }
}
export default generateCV;
