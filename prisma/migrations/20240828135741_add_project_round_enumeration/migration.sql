/*
  Warnings:

  - Changed the type of `Round` on the `Projects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProjectRound" AS ENUM ('PRE SEED', 'SEED', 'PRIVATE 1', 'PRIVATE 2', 'PRIVATE 3', 'PUBLIC');

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "Round",
ADD COLUMN     "Round" "ProjectRound" NOT NULL;
