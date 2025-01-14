/*
  Warnings:

  - A unique constraint covering the columns `[Id]` on the table `VestingBatch` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VestingBatch_Id_key" ON "VestingBatch"("Id");
