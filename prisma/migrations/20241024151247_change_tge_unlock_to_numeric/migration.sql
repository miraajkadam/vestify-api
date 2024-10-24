/*
  Warnings:

  - Changed the type of `TgeUnlock` on the `ProjectTokenMetrics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProjectTokenMetrics" DROP COLUMN "TgeUnlock",
ADD COLUMN     "TgeUnlock" DECIMAL(65,30) NOT NULL;
