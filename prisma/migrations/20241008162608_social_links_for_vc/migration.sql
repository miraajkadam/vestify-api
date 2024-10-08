-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "vCSocialId" TEXT;

-- CreateTable
CREATE TABLE "VCSocial" (
    "Id" TEXT NOT NULL,
    "ProjectId" TEXT NOT NULL,
    "X" TEXT,
    "Instagram" TEXT,
    "Discord" TEXT,
    "Telegram" TEXT,
    "Medium" TEXT,
    "Youtube" TEXT,

    CONSTRAINT "VCSocial_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VCSocial_ProjectId_key" ON "VCSocial"("ProjectId");

-- AddForeignKey
ALTER TABLE "VCSocial" ADD CONSTRAINT "VCSocial_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "VC"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_vCSocialId_fkey" FOREIGN KEY ("vCSocialId") REFERENCES "VCSocial"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
