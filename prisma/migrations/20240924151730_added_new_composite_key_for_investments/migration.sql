/*
  Warnings:

  - The primary key for the `UsersInvestedProjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `Id` was added to the `UsersInvestedProjects` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "UsersInvestedProjects" DROP CONSTRAINT "UsersInvestedProjects_pkey",
ADD COLUMN     "Id" TEXT NOT NULL,
ADD CONSTRAINT "UsersInvestedProjects_pkey" PRIMARY KEY ("Id", "UserId", "ProjectId");
