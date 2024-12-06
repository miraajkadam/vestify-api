/*
  Warnings:

  - A unique constraint covering the columns `[Id]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Projects_Id_key" ON "Projects"("Id");
