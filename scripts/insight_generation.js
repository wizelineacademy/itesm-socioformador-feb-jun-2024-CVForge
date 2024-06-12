const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function generate_recommendations(cvContent, jobPosition) {
  try {
    let prompt = `Hello! I'm seeking advice on improving my CV for a ${jobPosition} position. Below is the content of my CV:\n\n${cvContent}\n\n`
    prompt += `Based on this information and the targeted position, could you please provide recommendations on how I can enhance my CV to better align with the requirements and stand out to potential employers?`

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages: [{ role: 'user', content: prompt }],
    })

    const recommendationsString = response.choices[0].message.content.trim()
    if (recommendationsString.length < 10) {
      return [
        {
          title: 'No Recommendations',
          main_content:
            'No specific recommendations could be generated based on the provided CV content.',
        },
      ]
    }

    // Split the recommendations into an array based on some delimiter
    const recommendationsArray = recommendationsString
      .split('\n')
      .filter(Boolean)

    // Map the array to recommendation objects containing the title without numbering and main content
    const recommendations = recommendationsArray.map((recommendation) => {
      const parts = recommendation.split(':')
      let title = parts[0].trim()
      // Remove any numbering or "Recommendation" indication from the title
      title = title.replace(/^\d+\.\s*|\s*Recommendation\s*/i, '')
      const main_content = parts.slice(1).join(':').trim()
      return {
        title: title || 'General Recommendation',
        main_content: main_content,
      }
    })

    return recommendations
  } catch (e) {
    console.log(`An error occurred: ${e}`)
    return [
      {
        title: 'Error',
        main_content: 'An error occurred while generating recommendations.',
      },
    ]
  }
}

module.exports = generate_recommendations
