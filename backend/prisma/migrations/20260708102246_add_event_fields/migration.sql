-- AlterTable
ALTER TABLE "events" ADD COLUMN     "event_type" TEXT NOT NULL DEFAULT 'Concert',
ADD COLUMN     "image" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "notes" TEXT;
