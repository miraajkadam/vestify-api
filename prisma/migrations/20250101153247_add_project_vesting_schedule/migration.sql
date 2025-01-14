-- CreateTable
CREATE TABLE "VestingSchedule" (
    "Id" TEXT NOT NULL,
    "BatchInterval" "Interval" NOT NULL,

    CONSTRAINT "VestingSchedule_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "VestingBatch" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Percentage" DECIMAL(65,30) NOT NULL,
    "VestingScheduleId" TEXT NOT NULL,

    CONSTRAINT "VestingBatch_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VestingSchedule_Id_key" ON "VestingSchedule"("Id");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "VestingSchedule_Project_Id" FOREIGN KEY ("Id") REFERENCES "VestingSchedule"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VestingBatch" ADD CONSTRAINT "VestingBatch_Id_fkey" FOREIGN KEY ("Id") REFERENCES "VestingSchedule"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
