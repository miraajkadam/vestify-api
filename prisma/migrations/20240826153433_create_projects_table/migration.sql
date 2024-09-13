-- CreateTable
CREATE TABLE "Projects" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Round" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ProjectTokenMetrics" (
    "Id" TEXT NOT NULL,
    "ProjectId" TEXT NOT NULL,
    "FDV" TEXT NOT NULL,
    "Price" TEXT NOT NULL,
    "TgeUnlock" TEXT NOT NULL,
    "TGE" TIMESTAMP(3) NOT NULL,
    "Vesting" TIMESTAMP(3) NOT NULL,
    "Allocation" TEXT NOT NULL,

    CONSTRAINT "ProjectTokenMetrics_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "ProjectTokenMetrics" ADD CONSTRAINT "ProjectTokenMetrics_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
