/*
  Warnings:

  - You are about to drop the `relevant_coursework` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `relevant_coursework` to the `education` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "relevant_coursework" DROP CONSTRAINT "relevant_coursework_education_id_fkey";

-- AlterTable
ALTER TABLE "education" ADD COLUMN     "relevant_coursework" VARCHAR(500) NOT NULL;

-- DropTable
DROP TABLE "relevant_coursework";
