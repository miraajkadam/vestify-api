-- DropForeignKey
ALTER TABLE "VestingBatch" DROP CONSTRAINT "VestingBatch_Id_fkey";

-- AddForeignKey
ALTER TABLE "VestingBatch" ADD CONSTRAINT "VestingBatch_VestingScheduleId_fkey" FOREIGN KEY ("VestingScheduleId") REFERENCES "VestingSchedule"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
