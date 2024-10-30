/*
  Warnings:

  - You are about to drop the column `Linkedin` on the `VCSocial` table. All the data in the column will be lost.
  - Added the required column `Website` to the `ProjectSocials` table without a default value. This is not possible if the table is not empty.
  - Made the column `X` on table `ProjectSocials` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Telegram` on table `ProjectSocials` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `Website` to the `VCSocial` table without a default value. This is not possible if the table is not empty.
  - Made the column `X` on table `VCSocial` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Telegram` on table `VCSocial` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProjectSocials" ADD COLUMN     "Website" TEXT NOT NULL,
ALTER COLUMN "X" SET NOT NULL,
ALTER COLUMN "Telegram" SET NOT NULL;

-- AlterTable
ALTER TABLE "VCSocial" DROP COLUMN "Linkedin",
ADD COLUMN     "Website" TEXT NOT NULL,
ALTER COLUMN "X" SET NOT NULL,
ALTER COLUMN "Telegram" SET NOT NULL;
