/*
  Warnings:

  - You are about to drop the column `Category` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "Category",
ADD COLUMN     "Categories" TEXT[];
