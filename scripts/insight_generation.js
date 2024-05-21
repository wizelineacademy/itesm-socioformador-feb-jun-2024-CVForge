import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
});

export async function generate_recommendations(cv_data, job_position) {
    try {
        let prompt = `Hello! I'm seeking advice on improving my CV for a ${job_position} position. Below is the content of my CV:\n\n`;
        for (const [key, value] of Object.entries(cv_data)) {
            prompt += `CV section: ${key}\nContent: ${value}\n\n`;
        }
        prompt += `\nBased on this information and the targeted position, could you please provide recommendations on how I can enhance my CV to better align with the requirements and stand out to potential employers?`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
        });

        const recommendations = response.choices[0].message.content.trim();
        return recommendations;
    } catch (e) {
        console.log(`An error occurred: ${e}`);
        return "";
    }
}