/*
  Warnings:

  - You are about to alter the column `gpa` on the `education` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `DoublePrecision`.
  - The primary key for the `general_info` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `relevant_coursework` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "relevant_coursework" DROP CONSTRAINT "relevant_coursework_education_id_fkey";

-- AlterTable
ALTER TABLE "education" ADD COLUMN     "relevant_coursework" VARCHAR(500),
ALTER COLUMN "gpa" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "general_info" DROP CONSTRAINT "general_info_pkey",
ALTER COLUMN "general_info_id" SET DATA TYPE TEXT,
ALTER COLUMN "professional_info_id" DROP NOT NULL,
ADD CONSTRAINT "general_info_pkey" PRIMARY KEY ("general_info_id");

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "relevant_coursework";
