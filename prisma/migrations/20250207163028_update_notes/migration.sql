/*
  Warnings:

  - Added the required column `notes` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "notes" TEXT NOT NULL;
