/*
  Warnings:

  - You are about to drop the `ProjectDeals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectTokenMetrics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectTokenMetrics" DROP CONSTRAINT "ProjectTokenMetrics_ProjectId_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "ProjectDeals_Project_Id";

-- DropTable
DROP TABLE "ProjectDeals";

-- DropTable
DROP TABLE "ProjectTokenMetrics";

-- CreateTable
CREATE TABLE "ProjectRoundDetails" (
    "Id" TEXT NOT NULL,
    "AcceptedTokens" TEXT NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3) NOT NULL,
    "AmountToBeRaised" DECIMAL(65,30) NOT NULL,
    "Maximum" DECIMAL(65,30) NOT NULL,
    "Minimum" DECIMAL(65,30) NOT NULL,
    "TokenTicker" TEXT NOT NULL,
    "PoolFee" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ProjectRoundDetails_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "CurrentProjectTokenMetrics" (
    "Id" TEXT NOT NULL,
    "Round" "ProjectRound" NOT NULL,
    "FDV" TEXT NOT NULL,
    "Price" TEXT NOT NULL,
    "TgeUnlock" DECIMAL(65,30) NOT NULL,
    "TGE" TIMESTAMP(3) NOT NULL,
    "lockupPeriod" INTEGER NOT NULL,
    "ReleaseType" "Release" NOT NULL,
    "ReleaseMonths" INTEGER NOT NULL,

    CONSTRAINT "CurrentProjectTokenMetrics_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "PastProjectTokenMetrics" (
    "Id" TEXT NOT NULL,
    "ProjectId" TEXT NOT NULL,
    "Round" "ProjectRound" NOT NULL,
    "Price" TEXT NOT NULL,
    "lockupPeriod" INTEGER NOT NULL,
    "ReleaseType" "Release" NOT NULL,
    "ReleaseMonths" INTEGER NOT NULL,

    CONSTRAINT "PastProjectTokenMetrics_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectRoundDetails_Id_key" ON "ProjectRoundDetails"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "CurrentProjectTokenMetrics_Id_key" ON "CurrentProjectTokenMetrics"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "PastProjectTokenMetrics_Id_key" ON "PastProjectTokenMetrics"("Id");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "ProjectRoundDetails_Project_Id" FOREIGN KEY ("Id") REFERENCES "ProjectRoundDetails"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "CurrentProjectTokenMetrics_Project_Id" FOREIGN KEY ("Id") REFERENCES "CurrentProjectTokenMetrics"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastProjectTokenMetrics" ADD CONSTRAINT "PastProjectTokenMetrics_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
