/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rooms_number_key" ON "rooms"("number");
