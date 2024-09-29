/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AccountId` on the `Users` table. All the data in the column will be lost.
  - The primary key for the `VC` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AccountId` on the `VC` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Id]` on the table `VC` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Id` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `VC` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_VCId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_AccountId_fkey";

-- DropForeignKey
ALTER TABLE "UsersInvestedProjects" DROP CONSTRAINT "UsersInvestedProjects_UserId_fkey";

-- DropForeignKey
ALTER TABLE "UsersJoinedCapitals" DROP CONSTRAINT "UsersJoinedCapitals_UserId_fkey";

-- DropForeignKey
ALTER TABLE "UsersJoinedCapitals" DROP CONSTRAINT "UsersJoinedCapitals_VcId_fkey";

-- DropForeignKey
ALTER TABLE "VC" DROP CONSTRAINT "VC_AccountId_fkey";

-- DropIndex
DROP INDEX "Users_AccountId_key";

-- DropIndex
DROP INDEX "VC_AccountId_key";

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "AccountId",
ADD COLUMN     "Id" TEXT NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "VC" DROP CONSTRAINT "VC_pkey",
DROP COLUMN "AccountId",
ADD COLUMN     "Id" TEXT NOT NULL,
ADD CONSTRAINT "VC_pkey" PRIMARY KEY ("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_Id_key" ON "Users"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "VC_Id_key" ON "VC"("Id");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_Id_fkey" FOREIGN KEY ("Id") REFERENCES "Accounts"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VC" ADD CONSTRAINT "VC_Id_fkey" FOREIGN KEY ("Id") REFERENCES "Accounts"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_VCId_fkey" FOREIGN KEY ("VCId") REFERENCES "VC"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersJoinedCapitals" ADD CONSTRAINT "UsersJoinedCapitals_VcId_fkey" FOREIGN KEY ("VcId") REFERENCES "VC"("Id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersJoinedCapitals" ADD CONSTRAINT "UsersJoinedCapitals_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersInvestedProjects" ADD CONSTRAINT "UsersInvestedProjects_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE CASCADE;
