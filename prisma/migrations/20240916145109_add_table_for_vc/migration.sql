/*
  Warnings:

  - The required column `VCId` was added to the `Projects` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "VCId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "VC" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "LogoBase64" TEXT NOT NULL,
    "SubscriptionFee" DECIMAL(65,30) NOT NULL,
    "Tags" TEXT[],
    "KYCDone" BOOLEAN NOT NULL,

    CONSTRAINT "VC_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_VCId_fkey" FOREIGN KEY ("VCId") REFERENCES "VC"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
