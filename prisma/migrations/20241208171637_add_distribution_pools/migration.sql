-- CreateTable
CREATE TABLE "DistributionPool" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Addresses" TEXT[],
    "Fee" DECIMAL(65,30) NOT NULL,
    "MaxAllocation" DECIMAL(65,30) NOT NULL,
    "MinAllocation" DECIMAL(65,30) NOT NULL,
    "VcId" TEXT,

    CONSTRAINT "DistributionPool_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "DistributionPool" ADD CONSTRAINT "DistributionPool_VcId_fkey" FOREIGN KEY ("VcId") REFERENCES "VC"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
