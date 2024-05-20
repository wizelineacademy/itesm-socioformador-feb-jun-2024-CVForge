/*
  Warnings:

  - The primary key for the `general_info` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "general_info" DROP CONSTRAINT "general_info_pkey",
ALTER COLUMN "general_info_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "general_info_pkey" PRIMARY KEY ("general_info_id");
