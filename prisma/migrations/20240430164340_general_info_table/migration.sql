/*
  Warnings:

  - You are about to drop the column `cv_insight_id` on the `cv` table. All the data in the column will be lost.
  - You are about to drop the column `cv_insight_id` on the `recommendation` table. All the data in the column will be lost.
  - You are about to drop the `cv_insight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "achievement" DROP CONSTRAINT "achievement_professional_info_id_fkey";

-- DropForeignKey
ALTER TABLE "certificate" DROP CONSTRAINT "certificate_professional_info_id_fkey";

-- DropForeignKey
ALTER TABLE "cv" DROP CONSTRAINT "cv_cv_insight_id_fkey";

-- DropForeignKey
ALTER TABLE "education" DROP CONSTRAINT "education_professional_info_id_fkey";

-- DropForeignKey
ALTER TABLE "professional_info" DROP CONSTRAINT "professional_info_user_id_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_professional_info_id_fkey";

-- DropForeignKey
ALTER TABLE "recommendation" DROP CONSTRAINT "recommendation_cv_insight_id_fkey";

-- DropForeignKey
ALTER TABLE "skill" DROP CONSTRAINT "skill_professional_info_id_fkey";

-- DropForeignKey
ALTER TABLE "work_experience" DROP CONSTRAINT "work_experience_professional_info_id_fkey";

-- DropIndex
DROP INDEX "unique_cv_insight_id";

-- AlterTable
ALTER TABLE "cv" DROP COLUMN "cv_insight_id",
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "desired_position" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "company" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "education" ALTER COLUMN "school" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "education_degree" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "gpa" SET DATA TYPE DECIMAL;

-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "last_name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "recommendation" DROP COLUMN "cv_insight_id",
ADD COLUMN     "completed" BOOLEAN,
ADD COLUMN     "cv_id" UUID,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "relevant_coursework" ALTER COLUMN "course" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "skill" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "duration" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "proficiency" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "tag" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "work_experience" ALTER COLUMN "work_position" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "cv_insight";

-- CreateTable
CREATE TABLE "general_info" (
    "general_info_id" UUID NOT NULL,
    "professional_info_id" UUID NOT NULL,
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "email" VARCHAR(255),
    "phone" VARCHAR(255),
    "github_link" VARCHAR(255),
    "linkedin_link" VARCHAR(255),

    CONSTRAINT "general_info_pkey" PRIMARY KEY ("general_info_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "general_info_professional_info_id_key" ON "general_info"("professional_info_id");

-- CreateIndex
CREATE INDEX "idx_ai_response_cv_id" ON "ai_response"("cv_id");

-- CreateIndex
CREATE INDEX "idx_professional_info_user_id" ON "professional_info"("user_id");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_professional_info_id_fkey" FOREIGN KEY ("professional_info_id") REFERENCES "professional_info"("professional_info_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "professional_info" ADD CONSTRAINT "professional_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("users_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_professional_info_id_fkey" FOREIGN KEY ("professional_info_id") REFERENCES "professional_info"("professional_info_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recommendation" ADD CONSTRAINT "recommendation_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "cv"("cv_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "work_experience" ADD CONSTRAINT "work_experience_professional_info_id_fkey" FOREIGN KEY ("professional_info_id") REFERENCES "professional_info"("professional_info_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "achievement" ADD CONSTRAINT "achievement_professional_info_id_fkey" FOREIGN KEY ("professional_info_id") REFERENCES "professional_info"("professional_info_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "certificate" ADD CONSTRAINT "certificate_professional_info_id_fkey" FOREIGN KEY ("professional_info_id") REFERENCES "professional_info"("professional_info_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_professional_info_id_fkey" FOREIGN KEY ("professional_info_id") REFERENCES "professional_info"("professional_info_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "general_info" ADD CONSTRAINT "general_info_professional_info_id_fkey" FOREIGN KEY ("professional_info_id") REFERENCES "professional_info"("professional_info_id") ON DELETE CASCADE ON UPDATE NO ACTION;
