/*
  Warnings:

  - A unique constraint covering the columns `[desired_position_id]` on the table `cv` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "unique_desired_position_id" ON "cv"("desired_position_id");

-- CreateIndex
CREATE INDEX "idx_cv_desired_position_id" ON "cv"("desired_position_id");
