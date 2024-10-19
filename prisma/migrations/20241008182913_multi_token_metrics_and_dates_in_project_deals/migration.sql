/*
  Warnings:

  - You are about to drop the column `Allocation` on the `ProjectTokenMetrics` table. All the data in the column will be lost.
  - You are about to drop the column `Vesting` on the `ProjectTokenMetrics` table. All the data in the column will be lost.
  - Added the required column `EndDate` to the `ProjectDeals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartDate` to the `ProjectDeals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Round` to the `ProjectTokenMetrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TgeSummary` to the `ProjectTokenMetrics` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ProjectTokenMetrics_ProjectId_key";

-- AlterTable
ALTER TABLE "ProjectDeals" ADD COLUMN     "EndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "StartDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ProjectTokenMetrics" DROP COLUMN "Allocation",
DROP COLUMN "Vesting",
ADD COLUMN     "Round" "ProjectRound" NOT NULL,
ADD COLUMN     "TgeSummary" TEXT NOT NULL;
