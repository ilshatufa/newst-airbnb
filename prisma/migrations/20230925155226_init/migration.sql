-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('DONE', 'CANCEL', 'RESERVE', 'OPEN');

-- CreateEnum
CREATE TYPE "RoomView" AS ENUM ('SEA', 'PARK', 'POOL');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('ONEBEDROOM', 'TWOBEDROOM', 'FAMILYSUITE', 'LUX');

-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "view" "RoomView" NOT NULL DEFAULT 'PARK',
    "type" "RoomType" NOT NULL DEFAULT 'ONEBEDROOM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "status" "ScheduleStatus" NOT NULL DEFAULT 'OPEN',
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rooms_number_idx" ON "rooms"("number");

-- CreateIndex
CREATE INDEX "schedule_room_id_date_idx" ON "schedule"("room_id", "date");

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
