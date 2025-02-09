/*
  Warnings:

  - You are about to drop the column `BatchInterval` on the `VestingSchedule` table. All the data in the column will be lost.
  - Added the required column `ReleaseInterval` to the `VestingSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VestingSchedule" DROP COLUMN "BatchInterval",
ADD COLUMN     "ReleaseInterval" "Release" NOT NULL;
