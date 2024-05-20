/*
  Warnings:

  - You are about to alter the column `gpa` on the `education` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "education" ALTER COLUMN "gpa" SET DATA TYPE DOUBLE PRECISION;
