const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generate_recommendations(cvContent, jobPosition) {
    try {
        let prompt = `Hello! I'm seeking advice on improving my CV for a ${jobPosition} position. Below is the content of my CV:\n\n${cvContent}\n\n`;
        prompt += `Based on this information and the targeted position, could you please provide recommendations on how I can enhance my CV to better align with the requirements and stand out to potential employers?`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [{ role: "user", content: prompt }],
        });

        const recommendationsString = response.choices[0].message.content.trim();
        // If recommendations are too short or empty, provide a default message
        if (recommendationsString.length < 10) {
            return [{
                title: "Sorry",
                main_content: "No specific recommendations could be generated based on the provided CV content."
            }];
        }

        // Split the recommendations into an array based on some delimiter
        const recommendationsArray = recommendationsString.split('\n');

        // Map the array to recommendation objects
        const recommendations = recommendationsArray.map((recommendation, index) => ({
            title: `Recommendation ${index + 1}`,
            main_content: recommendation.trim()
        }));

        return recommendations;
    } catch (e) {
        console.log(`An error occurred: ${e}`);
        return [{
            title: "Error",
            main_content: "An error occurred while generating recommendations."
        }];
    }
}

module.exports = generate_recommendations;
