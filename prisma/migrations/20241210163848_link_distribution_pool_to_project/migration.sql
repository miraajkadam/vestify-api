/*
  Warnings:

  - You are about to drop the column `VcId` on the `DistributionPool` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DistributionPool" DROP CONSTRAINT "DistributionPool_VcId_fkey";

-- AlterTable
ALTER TABLE "DistributionPool" DROP COLUMN "VcId",
ADD COLUMN     "projectsId" TEXT;

-- AddForeignKey
ALTER TABLE "DistributionPool" ADD CONSTRAINT "DistributionPool_projectsId_fkey" FOREIGN KEY ("projectsId") REFERENCES "Projects"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
