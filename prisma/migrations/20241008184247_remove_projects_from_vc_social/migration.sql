/*
  Warnings:

  - You are about to drop the column `vCSocialId` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `ProjectId` on the `VCSocial` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[VCId]` on the table `VCSocial` will be added. If there are existing duplicate values, this will fail.
  - The required column `VCId` was added to the `VCSocial` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_vCSocialId_fkey";

-- DropForeignKey
ALTER TABLE "VCSocial" DROP CONSTRAINT "VCSocial_ProjectId_fkey";

-- DropIndex
DROP INDEX "VCSocial_ProjectId_key";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "vCSocialId";

-- AlterTable
ALTER TABLE "VCSocial" DROP COLUMN "ProjectId",
ADD COLUMN     "VCId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VCSocial_VCId_key" ON "VCSocial"("VCId");

-- AddForeignKey
ALTER TABLE "VCSocial" ADD CONSTRAINT "VCSocial_VCId_fkey" FOREIGN KEY ("VCId") REFERENCES "VC"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
