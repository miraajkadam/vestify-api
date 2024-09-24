/*
  Warnings:

  - Added the required column `Amount` to the `UsersInvestedProjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FromWalletKey` to the `UsersInvestedProjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PaymentCurrency` to the `UsersInvestedProjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PaymentNetwork` to the `UsersInvestedProjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ToWalletKey` to the `UsersInvestedProjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TransactionId` to the `UsersInvestedProjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsersInvestedProjects" ADD COLUMN     "Amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "FromWalletKey" TEXT NOT NULL,
ADD COLUMN     "PaymentCurrency" TEXT NOT NULL,
ADD COLUMN     "PaymentNetwork" TEXT NOT NULL,
ADD COLUMN     "ToWalletKey" TEXT NOT NULL,
ADD COLUMN     "TransactionId" TEXT NOT NULL;
