/*
  Warnings:

  - You are about to drop the column `VCId` on the `VCSocial` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[VCSocialId]` on the table `VC` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Id]` on the table `VCSocial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `VCSocialId` to the `VC` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VCSocial" DROP CONSTRAINT "VCSocial_VCId_fkey";

-- DropIndex
DROP INDEX "VCSocial_VCId_key";

-- AlterTable
ALTER TABLE "VC" ADD COLUMN     "VCSocialId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VCSocial" DROP COLUMN "VCId";

-- CreateIndex
CREATE UNIQUE INDEX "VC_VCSocialId_key" ON "VC"("VCSocialId");

-- CreateIndex
CREATE UNIQUE INDEX "VCSocial_Id_key" ON "VCSocial"("Id");

-- AddForeignKey
ALTER TABLE "VC" ADD CONSTRAINT "VC_VCSocialId_fkey" FOREIGN KEY ("VCSocialId") REFERENCES "VCSocial"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
