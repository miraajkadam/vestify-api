/*
  Warnings:

  - You are about to drop the column `Logo` on the `ProjectPartnersAndInvestors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectPartnersAndInvestors" DROP COLUMN "Logo",
ADD COLUMN     "LogoBase64" TEXT;

-- AlterTable
ALTER TABLE "ProjectTeamAndAdvisors" ADD COLUMN     "ImageBase64" TEXT;
