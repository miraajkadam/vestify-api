/*
  Warnings:

  - A unique constraint covering the columns `[ProjectId]` on the table `ProjectTokenMetrics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ProjectDeals" (
    "Id" TEXT NOT NULL,
    "ProjectId" TEXT NOT NULL,
    "Maximum" DECIMAL(65,30) NOT NULL,
    "Minimum" DECIMAL(65,30) NOT NULL,
    "AcceptedTokens" TEXT NOT NULL,
    "PoolFee" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ProjectDeals_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ProjectTeamAndAdvisors" (
    "Id" TEXT NOT NULL,
    "ProjectId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "ProjectTeamAndAdvisors_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ProjectPartnersAndInvestors" (
    "Id" TEXT NOT NULL,
    "ProjectId" TEXT NOT NULL,
    "PartnerAndInvestorName" TEXT NOT NULL,
    "PartnerAndInvestorLogo" TEXT NOT NULL,

    CONSTRAINT "ProjectPartnersAndInvestors_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDeals_ProjectId_key" ON "ProjectDeals"("ProjectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTokenMetrics_ProjectId_key" ON "ProjectTokenMetrics"("ProjectId");

-- AddForeignKey
ALTER TABLE "ProjectDeals" ADD CONSTRAINT "ProjectDeals_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTeamAndAdvisors" ADD CONSTRAINT "ProjectTeamAndAdvisors_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPartnersAndInvestors" ADD CONSTRAINT "ProjectPartnersAndInvestors_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
