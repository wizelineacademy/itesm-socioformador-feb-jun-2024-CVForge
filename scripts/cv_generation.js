import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

// Function to parse the data
function parseData(objStr) {
  // Convert the string back to an object
  const obj = JSON.parse(objStr);

  // Destructure the object to separate different categories
  const { education, project, work } = obj;

  // Return an object with the needed data formatted properly
  return {
    education: education.map((e) => ({
      education_degree: e.education_degree,
      school: e.school,
      gpa: e.gpa,
      start_date: e.start_date,
      end_date: e.end_date,
      relevant_coursework: e.relevant_coursework,
    })),
    project: project.map((p) => ({
      name: p.name,
      description: p.description,
      start_date: p.start_date,
      end_date: p.end_date,
    })),
    work: work.map((w) => ({
      work_position: w.work_position,
      description: w.description,
      start_date: w.start_date,
      end_date: w.end_date,
    })),
  };
}
// Function to generate CV using OpenAI
async function generateCV(cvData, jobPosition) {
  const parsedData = parseData(cvData);

  const obj = JSON.parse(cvData);
  const { generalInfo } = obj;

  try {
    let prompt = `I will provide information about various sections of a professional's profile. Your task is to select the most relevant content for the job position: '${jobPosition}'. Each section includes different types of information such as education, skills, achievements, work experience, and certifications. Here is the provided information:\n\n`;

    for (const [section, contentArray] of Object.entries(parsedData)) {
      prompt += `Section (can contain multiple elements): ${
        section.charAt(0).toUpperCase() + section.slice(1)
      }\n`;
      contentArray.forEach((content) => {
        Object.entries(content).forEach(([key, value]) => {
          prompt += `${key}: ${value}, `;
        });
        prompt = prompt.slice(0, -2); // Remove the last comma and space
        prompt += `\n\n`;
      });
    }

    prompt += `Based on the information provided, select sections and their content and the job position: '${jobPosition}'. You must return it in markdown format and include all possible content that fits the job position, like the following: <h2>Section</h2>, <h3>Content</h3>, <h3>Content</h3>. Do not modify any of the content. If necessary, use many Content fields. Do not return the content in curly braces. Return only the selected sections and their corresponding content. DO NOT ADD INFORMATION THAT WAS NOT PROVIDED TO YOU`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "user", content: prompt }],
    });

    const recommendations = response.choices[0].message.content.trim();

    // Append generalInfo data to the recommendations
    const constructedCv =
      `<h1>Name: ${generalInfo.first_name} ${generalInfo.last_name}</h1>\n` +
      `<p>Email: ${generalInfo.email}</p>\n` +
      `<p>Phone: ${generalInfo.phone}</p>\n` +
      `<p>Github: ${generalInfo.github_link}</p>\n` +
      `<p>LinkedIn: ${generalInfo.linkedin_link}</p>\n\n` +
      recommendations;

    return constructedCv;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return "";
  }
}
export default generateCV;
