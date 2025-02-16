-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('video', 'pdf');

-- Add the new column
ALTER TABLE "Notes" ADD COLUMN "source" "SourceType";

-- Make videoUrl nullable
ALTER TABLE "Notes" ALTER COLUMN "videoUrl" DROP NOT NULL;

-- Update existing records
UPDATE "Notes" SET "source" = 'video';

-- Make source required
ALTER TABLE "Notes" ALTER COLUMN "source" SET NOT NULL;
