/*
  Warnings:

  - A unique constraint covering the columns `[sequence]` on the table `TaskStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TaskStatus" ADD COLUMN     "sequence" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TaskStatus_sequence_key" ON "TaskStatus"("sequence");
