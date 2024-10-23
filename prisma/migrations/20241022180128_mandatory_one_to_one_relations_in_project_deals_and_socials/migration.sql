/*
  Warnings:

  - You are about to drop the column `ProjectId` on the `ProjectDeals` table. All the data in the column will be lost.
  - You are about to drop the column `ProjectId` on the `ProjectSocials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Id]` on the table `ProjectDeals` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Id]` on the table `ProjectSocials` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProjectDeals" DROP CONSTRAINT "ProjectDeals_ProjectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSocials" DROP CONSTRAINT "ProjectSocials_ProjectId_fkey";

-- DropIndex
DROP INDEX "ProjectDeals_ProjectId_key";

-- DropIndex
DROP INDEX "ProjectSocials_ProjectId_key";

-- AlterTable
ALTER TABLE "ProjectDeals" DROP COLUMN "ProjectId";

-- AlterTable
ALTER TABLE "ProjectSocials" DROP COLUMN "ProjectId";

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDeals_Id_key" ON "ProjectDeals"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectSocials_Id_key" ON "ProjectSocials"("Id");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "ProjectDeals_Project_Id" FOREIGN KEY ("Id") REFERENCES "ProjectDeals"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "ProjectSocials_Project_Id" FOREIGN KEY ("Id") REFERENCES "ProjectSocials"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
