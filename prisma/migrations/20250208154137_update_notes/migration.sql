/*
  Warnings:

  - You are about to drop the column `notes` on the `Notes` table. All the data in the column will be lost.
  - Added the required column `content` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notes" DROP COLUMN "notes",
ADD COLUMN     "content" JSONB NOT NULL;
