import openai
import os
import json
import sys

api_key = os.environ.get("OPENAI_API_KEY")
openai.api_key = api_key  # Set API key for the library

def generate_recommendations(cv_data, job_position):
    try:
        # Craft prompt
        prompt = f"Hello! I'm seeking advice on improving my CV for a {job_position} position. Below is the content of my CV:\n\n"
        for section in cv_data:
            for key, value in section.items():
                prompt += f"CV section: {key}\nContent: {value}\n\n"
        prompt += "\nBased on this information and the targeted position, could you please provide recommendations on how I can enhance my CV to better align with the requirements and stand out to potential employers?"

        # Generate recommendations
        chat_completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": prompt
                }
            ]
        )
        recommendations = chat_completion.choices[0].message.content.strip()

        # Parse recommendations for more specific details
        parsed_recommendations = parse_recommendations(recommendations)

        return parsed_recommendations
    except Exception as e:
        print(f"An error occurred: {e}")
        return ""

def parse_recommendations(recommendations):
    # Parse recommendations for more specific details
    
    return recommendations

if __name__ == "__main__":
    try:
        print("Highlight Data Engineering skills:Include specific projects or experiences where you worked with data engineering technologies such as Apache Spark, Kafka, Hadoop, or SQL databases. Mention any experience with ETL processes, data modeling, data pipelines, and data warehousing.")
        print("Quantify Achievements:Instead of just mentioning you managed a team of 20+ members, quantify the impact of your leadership skills. For example, mention how you improved team efficiency by X%, reduced delivery times by Y%, or increased project success rates by Z%.")
        print("Data-related Projects:If you have worked on any data-related projects, showcase them in your CV. Mention how you collected, cleaned, analyzed, and visualized data to derive insights or improve business processes.")
        cv_data = json.loads(sys.argv[1])
        job_position = sys.argv[2]
        
        recommendations = generate_recommendations(cv_data, job_position)

        # Print recommendations
        print("Recommendations to improve your CV:")
        print(recommendations)
    except Exception as e:
        print(f"An error occurred: {e}")