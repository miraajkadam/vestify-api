/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('USER', 'VC');

-- DropTable
DROP TABLE "Users";

-- DropEnum
DROP TYPE "UserType";

-- CreateTable
CREATE TABLE "Accounts" (
    "Id" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "AccountType" "AccountType" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_Username_key" ON "Accounts"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_Email_key" ON "Accounts"("Email");
