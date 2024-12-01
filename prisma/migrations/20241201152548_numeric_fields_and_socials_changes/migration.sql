/*
  Warnings:

  - You are about to drop the column `AmountToBeRaised` on the `ProjectRoundDetails` table. All the data in the column will be lost.
  - You are about to drop the column `Youtube` on the `ProjectSocials` table. All the data in the column will be lost.
  - Changed the type of `FDV` on the `CurrentProjectTokenMetrics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Price` on the `CurrentProjectTokenMetrics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Price` on the `PastProjectTokenMetrics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `RaiseAmount` to the `ProjectRoundDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CurrentProjectTokenMetrics" DROP COLUMN "FDV",
ADD COLUMN     "FDV" DECIMAL(65,30) NOT NULL,
DROP COLUMN "Price",
ADD COLUMN     "Price" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "PastProjectTokenMetrics" DROP COLUMN "Price",
ADD COLUMN     "Price" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "ProjectRoundDetails" DROP COLUMN "AmountToBeRaised",
ADD COLUMN     "RaiseAmount" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "ProjectSocials" DROP COLUMN "Youtube";
