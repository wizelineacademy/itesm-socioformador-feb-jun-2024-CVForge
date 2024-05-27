import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
});

export async function generate_recommendations(cvContent, jobPosition) {
    try {
        let prompt = `Hello! I'm seeking advice on improving my CV for a ${jobPosition} position. Below is the content of my CV:\n\n${cvContent}\n\n`;
        prompt += `Based on this information and the targeted position, could you please provide recommendations on how I can enhance my CV to better align with the requirements and stand out to potential employers?`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [{ role: "user", content: prompt }],
        });

        const recommendations = response.choices[0].message.content.trim();
        // If recommendations are too short or empty, provide a default message
        if (recommendations.length < 10) {
            return "Sorry, no specific recommendations could be generated based on the provided CV content.";
        }

        return recommendations;
    } catch (e) {
        console.log(`An error occurred: ${e}`);
        return "Sorry, an error occurred while generating recommendations.";
    }
}
