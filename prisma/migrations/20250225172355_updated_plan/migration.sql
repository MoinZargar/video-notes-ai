/*
  Warnings:

  - You are about to drop the column `PlanId` on the `Plan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[planId]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `planId` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Plan_PlanId_key";

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "PlanId",
ADD COLUMN     "planId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Plan_planId_key" ON "Plan"("planId");
