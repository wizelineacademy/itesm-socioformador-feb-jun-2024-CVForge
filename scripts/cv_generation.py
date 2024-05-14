import openai
import os
import sys
import re

api_key = os.environ.get("OPENAI_API_KEY")
openai.api_key = api_key  # Set API key for the library

# def generate_recommendations(cv_data, job_position):
#     try:
#         # Craft prompt

#         prompt = f"Hello! I'm seeking advice on improving my CV for a {job_position} position. Below is the content of my CV:\n\n"
#         # for section in cv_data:
#         #     for key, value in section.items():
#         #         prompt += f"CV section: {key}\nContent: {value}\n\n"
#         for key, value in cv_data.items():
#             prompt += f"CV section: {key}\nContent: {value}\n\n"
#         prompt += "\nBased on this information and the targeted position, could you please provide recommendations on how I can enhance my CV to better align with the requirements and stand out to potential employers?"

#         # Generate recommendations
#         chat_completion = openai.chat.completions.create(
#             model="gpt-3.5-turbo",
#             messages=[
#                 {
#                     "role": "system",
#                     "content": prompt
#                 }
#             ]
#         )
#         recommendations = chat_completion.choices[0].message.content.strip()

#         # Parse recommendations for more specific details
#         parsed_recommendations = parse_recommendations(recommendations)

#         return parsed_recommendations
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return ""

# def parse_recommendations(recommendations):
#     # Parse recommendations for more specific details

#     return recommendations

if __name__ == "__main__":
    try:
        # cv_data = json.loads(sys.argv[1])
        data = sys.argv[1]

        print(data)
    except Exception as e:
        print(f"An error occurred: {e}")
