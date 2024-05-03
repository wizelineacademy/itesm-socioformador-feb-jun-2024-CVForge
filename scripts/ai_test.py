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

        return recommendations
    except Exception as e:
        print(f"An error occurred: {e}")
        return ""

if __name__ == "__main__":
    try:
        # Read CV data and job position from command line arguments
        cv_data = json.loads(sys.argv[1])
        job_position = sys.argv[2]
        
        # Generate recommendations for the provided CV data and job position
        recommendations = generate_recommendations(cv_data, job_position)

        # Print recommendations
        print("Recommendations to improve your CV:")
        print(recommendations)
    except Exception as e:
        print(f"An error occurred: {e}")
