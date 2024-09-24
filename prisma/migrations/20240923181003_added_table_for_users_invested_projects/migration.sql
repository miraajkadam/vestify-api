/*
  Warnings:

  - The primary key for the `UsersJoinedCapitals` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UsersJoinedCapitals" DROP CONSTRAINT "UsersJoinedCapitals_pkey",
ADD CONSTRAINT "UsersJoinedCapitals_pkey" PRIMARY KEY ("UserId", "VcId");

-- CreateTable
CREATE TABLE "UsersInvestedProjects" (
    "UserId" TEXT NOT NULL,
    "ProjectId" TEXT NOT NULL,
    "invested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersInvestedProjects_pkey" PRIMARY KEY ("UserId","ProjectId")
);

-- AddForeignKey
ALTER TABLE "UsersInvestedProjects" ADD CONSTRAINT "UsersInvestedProjects_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersInvestedProjects" ADD CONSTRAINT "UsersInvestedProjects_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE NO ACTION ON UPDATE CASCADE;
