BEGIN;

-- Drop tables if they exist with cascade to automatically drop any dependent objects
DROP TABLE IF EXISTS work_experience, skill, relevant_coursework, recommendation, project, profile, education, ai_response, cv, desired_position, certificate, achievement, professional_info, users CASCADE;

-- Table for users
CREATE TABLE IF NOT EXISTS users (
    users_id uuid PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    verification BOOLEAN,
    is_active BOOLEAN,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

-- Table for professional info linking to users
CREATE TABLE IF NOT EXISTS professional_info (
    professional_info_id uuid PRIMARY KEY,
    user_id uuid REFERENCES users(users_id) ON DELETE CASCADE,
    CONSTRAINT unique_user_id UNIQUE (user_id)
);

-- Table for achievements
CREATE TABLE IF NOT EXISTS achievement (
    achievement_id uuid PRIMARY KEY,
    professional_info_id uuid REFERENCES professional_info(professional_info_id) ON DELETE CASCADE,
    name VARCHAR(255),
    description VARCHAR(1000)
);

-- Table for certificates
CREATE TABLE IF NOT EXISTS certificate (
    certificate_id uuid PRIMARY KEY,
    professional_info_id uuid REFERENCES professional_info(professional_info_id) ON DELETE CASCADE,
    title VARCHAR(255),
    organization VARCHAR(255),
    start_date DATE,
    end_date DATE,
    url TEXT
);

-- Table for desired positions
CREATE TABLE IF NOT EXISTS desired_position (
    desired_position_id uuid PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(500),
    company VARCHAR(255),
    years_experience INTEGER
);

-- Table for CVs
CREATE TABLE IF NOT EXISTS cv (
    cv_id uuid PRIMARY KEY,
    user_id uuid REFERENCES users(users_id),
    title VARCHAR(255),
    desired_position_id uuid REFERENCES desired_position(desired_position_id),
    CONSTRAINT unique_desired_position_id UNIQUE (desired_position_id)
);

-- Table for AI responses
CREATE TABLE IF NOT EXISTS ai_response (
    ai_response_id uuid PRIMARY KEY,
    plain_text TEXT,
    cv_id uuid REFERENCES cv(cv_id),
    tokens NUMERIC,
    request_date TIMESTAMPTZ,
    CONSTRAINT unique_cv_id UNIQUE (cv_id)
);

-- Table for education
CREATE TABLE IF NOT EXISTS education (
    education_id uuid PRIMARY KEY,
    school VARCHAR(255),
    education_degree VARCHAR(255),
    gpa NUMERIC,
    start_date DATE,
    end_date DATE,
    professional_info_id uuid REFERENCES professional_info(professional_info_id) ON DELETE CASCADE
);

-- Table for profiles
CREATE TABLE IF NOT EXISTS profile (
    profile_id uuid PRIMARY KEY,
    user_id uuid REFERENCES users(users_id),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    github_link VARCHAR(255),
    linkedin_link VARCHAR(255),
    location VARCHAR(255),
    birthdate DATE,
    gender VARCHAR(1),
    CONSTRAINT profile_user_id_key UNIQUE (user_id)
);

-- Table for projects
CREATE TABLE IF NOT EXISTS project (
    project_id uuid PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(1000),
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    professional_info_id uuid REFERENCES professional_info(professional_info_id) ON DELETE CASCADE
);

-- Table for recommendations
CREATE TABLE IF NOT EXISTS recommendation (
    recommendation_id uuid PRIMARY KEY,
    cv_id uuid REFERENCES cv(cv_id),
    title VARCHAR(255),
    main_content TEXT,
    completed BOOLEAN
);

-- Table for relevant coursework
CREATE TABLE IF NOT EXISTS relevant_coursework (
    relevant_coursework_id uuid PRIMARY KEY,
    education_id uuid REFERENCES education(education_id),
    course VARCHAR(255)
);

-- Table for skills
CREATE TABLE IF NOT EXISTS skill (
    skill_id uuid PRIMARY KEY,
    professional_info_id uuid REFERENCES professional_info(professional_info_id) ON DELETE CASCADE,
    title VARCHAR(255),
    duration VARCHAR(255),
    proficiency VARCHAR(255),
    tag VARCHAR(255)
);

-- Table for work experience
CREATE TABLE IF NOT EXISTS work_experience (
    work_experience_id uuid PRIMARY KEY,
    work_position VARCHAR(255),
    description VARCHAR(1000),
    start_date DATE,
    end_date DATE,
    professional_info_id uuid REFERENCES professional_info(professional_info_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_professional_info_user_id ON professional_info(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_response_cv_id ON ai_response(cv_id);
CREATE INDEX IF NOT EXISTS idx_cv_desired_position_id ON cv(desired_position_id);

COMMIT;
