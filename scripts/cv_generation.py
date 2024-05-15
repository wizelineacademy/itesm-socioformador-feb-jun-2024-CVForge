import openai
import os
import sys
import re

# Set API key for the library
api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OpenAI API key not found in environment variables.")
openai.api_key = api_key


def generate_cv(cv_data, job_position):
    try:
        # Craft prompt
        prompt = f"I will provide information about various sections of a professional's profile. Your task is to select the most relevant content for the job position: '{job_position}'. Each section includes different types of information such as education, skills, achievements, work experience, and certifications. Here is the provided information:\n\n"

        for section, content in cv_data.items():
            prompt += f"Section: {section.capitalize()}\nContent: {content}\n\n"

        prompt += (
            f"Based on the information provided, select only the sections and their content that are most relevant for the job position: '{job_position}'. "
            "Do not modify any of the content. Return only the selected sections and their corresponding content."
        )

        # Generate recommendations
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}]
        )

        # Extract the response content
        recommendations = response.choices[0].message.content.strip()

        return parse_recommendations(recommendations)

    except Exception as e:
        print(f"An error occurred: {e}")
        return ""


def parse_recommendations(recommendations):
    # Assuming recommendations are returned as a structured text. Adjust parsing as needed.
    return recommendations


def parse_data(obj_str):
    # Remove the outermost braces
    obj_str = obj_str.strip("{}")

    # Regular expression to match each category and its content
    # Modified to ensure it captures the last category
    category_regex = r"(\w+):(\[\{.*?\}\])(?=,\w+:|$)"

    matches = re.finditer(category_regex, obj_str)

    categories = {}
    for match in matches:
        category = match.group(1)
        content = match.group(2)
        content = content[1:-1]
        categories[category] = content

    return categories


if __name__ == "__main__":
    try:
        data = sys.argv[1]
        job_position = sys.argv[2]

        # Parse categories from the provided data
        parsed_data = parse_data(data)

        # Generate recommendations for all categories at once
        cv = generate_cv(parsed_data, job_position)

        # Print recommendations
        print(cv)

    except Exception as e:
        print(f"An error occurred: {e}")
