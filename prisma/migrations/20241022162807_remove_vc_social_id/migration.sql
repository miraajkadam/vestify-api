/*
  Warnings:

  - You are about to drop the column `VCSocialId` on the `VC` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "VC" DROP CONSTRAINT "VC_VCSocialId_fkey";

-- DropIndex
DROP INDEX "VC_VCSocialId_key";

-- AlterTable
ALTER TABLE "VC" DROP COLUMN "VCSocialId";

-- AddForeignKey
ALTER TABLE "VC" ADD CONSTRAINT "VCSocial_VC_ID" FOREIGN KEY ("Id") REFERENCES "VCSocial"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
