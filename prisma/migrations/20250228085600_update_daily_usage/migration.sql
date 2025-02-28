/*
  Warnings:

  - A unique constraint covering the columns `[subscriptionId]` on the table `DailyUsage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DailyUsage_subscriptionId_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "DailyUsage_subscriptionId_key" ON "DailyUsage"("subscriptionId");
