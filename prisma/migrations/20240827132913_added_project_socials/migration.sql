-- CreateTable
CREATE TABLE "ProjectSocials" (
    "Id" TEXT NOT NULL,
    "ProjectId" TEXT NOT NULL,
    "X" TEXT NOT NULL,
    "Instagram" TEXT NOT NULL,
    "Discord" TEXT NOT NULL,
    "Telegram" TEXT NOT NULL,
    "Medium" TEXT NOT NULL,
    "Youtube" TEXT NOT NULL,

    CONSTRAINT "ProjectSocials_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectSocials_ProjectId_key" ON "ProjectSocials"("ProjectId");
