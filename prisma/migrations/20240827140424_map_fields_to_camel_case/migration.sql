/*
  Warnings:

  - You are about to drop the column `PartnerAndInvestorLogo` on the `ProjectPartnersAndInvestors` table. All the data in the column will be lost.
  - You are about to drop the column `PartnerAndInvestorName` on the `ProjectPartnersAndInvestors` table. All the data in the column will be lost.
  - Added the required column `Logo` to the `ProjectPartnersAndInvestors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `ProjectPartnersAndInvestors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectPartnersAndInvestors" DROP COLUMN "PartnerAndInvestorLogo",
DROP COLUMN "PartnerAndInvestorName",
ADD COLUMN     "Logo" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProjectSocials" ADD CONSTRAINT "ProjectSocials_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
