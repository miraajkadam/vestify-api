-- DropForeignKey
ALTER TABLE "ProjectDeals" DROP CONSTRAINT "ProjectDeals_ProjectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectPartnersAndInvestors" DROP CONSTRAINT "ProjectPartnersAndInvestors_ProjectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSocials" DROP CONSTRAINT "ProjectSocials_ProjectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTeamAndAdvisors" DROP CONSTRAINT "ProjectTeamAndAdvisors_ProjectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTokenMetrics" DROP CONSTRAINT "ProjectTokenMetrics_ProjectId_fkey";

-- AlterTable
ALTER TABLE "ProjectSocials" ALTER COLUMN "X" DROP NOT NULL,
ALTER COLUMN "Instagram" DROP NOT NULL,
ALTER COLUMN "Discord" DROP NOT NULL,
ALTER COLUMN "Telegram" DROP NOT NULL,
ALTER COLUMN "Medium" DROP NOT NULL,
ALTER COLUMN "Youtube" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProjectTokenMetrics" ADD CONSTRAINT "ProjectTokenMetrics_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectDeals" ADD CONSTRAINT "ProjectDeals_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTeamAndAdvisors" ADD CONSTRAINT "ProjectTeamAndAdvisors_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPartnersAndInvestors" ADD CONSTRAINT "ProjectPartnersAndInvestors_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSocials" ADD CONSTRAINT "ProjectSocials_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
