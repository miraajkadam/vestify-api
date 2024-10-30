/*
  Warnings:

  - You are about to drop the column `Instagram` on the `ProjectSocials` table. All the data in the column will be lost.
  - You are about to drop the column `Instagram` on the `VCSocial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectSocials" DROP COLUMN "Instagram";

-- AlterTable
ALTER TABLE "VCSocial" DROP COLUMN "Instagram";
