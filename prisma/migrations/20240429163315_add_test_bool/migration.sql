-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "testBool" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ai_response" (
    "ai_response_id" UUID NOT NULL,
    "plain_text" TEXT,
    "cv_id" UUID,
    "tokens" DECIMAL,
    "request_date" TIMESTAMPTZ(6),

    CONSTRAINT "ai_response_pkey" PRIMARY KEY ("ai_response_id")
);

-- CreateTable
CREATE TABLE "cv" (
    "cv_id" UUID NOT NULL,
    "user_id" UUID,
    "cv_insight_id" UUID,
    "desired_position_id" UUID,

    CONSTRAINT "cv_pkey" PRIMARY KEY ("cv_id")
);

-- CreateTable
CREATE TABLE "cv_insight" (
    "cv_insight_id" UUID NOT NULL,
    "score" INTEGER,

    CONSTRAINT "cv_insight_pkey" PRIMARY KEY ("cv_insight_id")
);

-- CreateTable
CREATE TABLE "desired_position" (
    "desired_position_id" UUID NOT NULL,
    "title" VARCHAR(25),
    "description" VARCHAR(500),
    "company" VARCHAR(20),
    "years_experience" INTEGER,

    CONSTRAINT "desired_position_pkey" PRIMARY KEY ("desired_position_id")
);

-- CreateTable
CREATE TABLE "education" (
    "education_id" UUID NOT NULL,
    "school" VARCHAR(50),
    "education_degree" VARCHAR(50),
    "gpa" INTEGER,
    "start_date" DATE,
    "end_date" DATE,
    "professional_info_id" UUID,

    CONSTRAINT "education_pkey" PRIMARY KEY ("education_id")
);

-- CreateTable
CREATE TABLE "professional_info" (
    "professional_info_id" UUID NOT NULL,
    "user_id" UUID,

    CONSTRAINT "professional_info_pkey" PRIMARY KEY ("professional_info_id")
);

-- CreateTable
CREATE TABLE "profile" (
    "profile_id" UUID NOT NULL,
    "user_id" UUID,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "github_link" VARCHAR(255),
    "linkedin_link" VARCHAR(255),
    "location" VARCHAR(255),
    "birthdate" DATE,
    "gender" VARCHAR(1),

    CONSTRAINT "profile_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "project" (
    "project_id" UUID NOT NULL,
    "name" VARCHAR(50),
    "description" VARCHAR(500),
    "start_date" TIMESTAMPTZ(6),
    "end_date" TIMESTAMPTZ(6),
    "professional_info_id" UUID,

    CONSTRAINT "project_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "recommendation" (
    "recommendation_id" UUID NOT NULL,
    "cv_insight_id" UUID,
    "title" VARCHAR(50),
    "main_content" TEXT,

    CONSTRAINT "recommendation_pkey" PRIMARY KEY ("recommendation_id")
);

-- CreateTable
CREATE TABLE "relevant_coursework" (
    "relevant_coursework_id" UUID NOT NULL,
    "education_id" UUID,
    "course" VARCHAR(100),

    CONSTRAINT "relevant_coursework_pkey" PRIMARY KEY ("relevant_coursework_id")
);

-- CreateTable
CREATE TABLE "users" (
    "users_id" UUID NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "verification" BOOLEAN,
    "is_active" BOOLEAN,
    "last_login" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("users_id")
);

-- CreateTable
CREATE TABLE "work_experience" (
    "work_experience_id" UUID NOT NULL,
    "work_position" VARCHAR(50),
    "description" VARCHAR(1000),
    "start_date" DATE,
    "end_date" DATE,
    "professional_info_id" UUID,

    CONSTRAINT "work_experience_pkey" PRIMARY KEY ("work_experience_id")
);

-- CreateTable
CREATE TABLE "achievement" (
    "achievement_id" UUID NOT NULL,
    "professional_info_id" UUID,
    "name" VARCHAR(255),
    "description" VARCHAR(1000),

    CONSTRAINT "achievement_pkey" PRIMARY KEY ("achievement_id")
);

-- CreateTable
CREATE TABLE "certificate" (
    "certificate_id" UUID NOT NULL,
    "professional_info_id" UUID,
    "title" VARCHAR(255),
    "organization" VARCHAR(255),
    "start_date" DATE,
    "end_date" DATE,
    "url" TEXT,

    CONSTRAINT "certificate_pkey" PRIMARY KEY ("certificate_id")
);

-- CreateTable
CREATE TABLE "skill" (
    "skill_id" UUID NOT NULL,
    "professional_info_id" UUID,
    "title" VARCHAR(100),
    "duration" VARCHAR(100),
    "proficiency" VARCHAR(100),
    "tag" VARCHAR(100),

    CONSTRAINT "skill_pkey" PRIMARY KEY ("skill_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "unique_cv_id" ON "ai_response"("cv_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_cv_insight_id" ON "cv"("cv_insight_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_desired_position_id" ON "cv"("desired_position_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_user_id" ON "professional_info"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_response" ADD CONSTRAINT "ai_response_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "cv"("cv_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cv" ADD CONSTRAINT "cv_cv_insight_id_fkey" FOREIGN KEY ("cv_insight_id") REFERENCES "cv_insight"("cv_insight_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cv" ADD CONSTRAINT "cv_desired_position_id_fkey" FOREIGN KEY ("desired_position_id") REFERENCES "desired_position"("desired_position_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cv" ADD CONSTRAINT "cv_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("users_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_professional_info_id_fkey" FOREIGN KEY ("professional_info_id") REFERENCES "professional_info"("professional_info_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "professional_info" ADD CONSTRAINT "professional_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("users_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("users_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_professional_info_id_fkey" FOREIGN KEY ("professional_info_id") REFERENCES "professional_info"("professional_info_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recommendation" ADD CONSTRAINT "recommendation_cv_insight_id_fkey" FOREIGN KEY ("cv_insight_id") REFERENCES "cv_insight"("cv_insight_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relevant_coursework" ADD CONSTRAINT "relevant_coursework_education_id_fkey" FOREIGN KEY ("education_id") REFERENCES "education"("education_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "work_experience" ADD CONSTRAINT "work_experience_professional_info_id_fkey" FOREIGN KEY ("professional_info_id") REFERENCES "professional_info"("professional_info_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "achievement" ADD CONSTRAINT "achievement_professional_info_id_fkey" FOREIGN KEY ("professional_info_id") REFERENCES "professional_info"("professional_info_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "certificate" ADD CONSTRAINT "certificate_professional_info_id_fkey" FOREIGN KEY ("professional_info_id") REFERENCES "professional_info"("professional_info_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_professional_info_id_fkey" FOREIGN KEY ("professional_info_id") REFERENCES "professional_info"("professional_info_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
