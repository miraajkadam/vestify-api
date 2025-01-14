/*
  Warnings:

  - A unique constraint covering the columns `[projectsId]` on the table `VestingSchedule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "VestingSchedule_Project_Id";

-- AlterTable
ALTER TABLE "VestingSchedule" ADD COLUMN     "projectsId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "VestingSchedule_projectsId_key" ON "VestingSchedule"("projectsId");

-- AddForeignKey
ALTER TABLE "VestingSchedule" ADD CONSTRAINT "VestingSchedule_projectsId_fkey" FOREIGN KEY ("projectsId") REFERENCES "Projects"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
