/*
  Warnings:

  - Added the required column `SubscriptionRenewalInterval` to the `VC` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Interval" AS ENUM ('MONTHLY', 'QUARTERLY', 'ANUALLY');

-- CreateEnum
CREATE TYPE "Release" AS ENUM ('LINEAR', 'QUARTERLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "Chain" AS ENUM ('EVM', 'SOLANA');

-- AlterTable
ALTER TABLE "UsersJoinedCapitals" ADD COLUMN     "renewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "joined_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "VC" ADD COLUMN     "SubscriptionRenewalInterval" "Interval" NOT NULL;
