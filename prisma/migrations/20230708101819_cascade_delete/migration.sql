-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_tripId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_tripId_fkey";

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
