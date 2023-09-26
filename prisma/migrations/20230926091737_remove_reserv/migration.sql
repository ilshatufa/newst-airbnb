/*
  Warnings:

  - The values [RESERVE] on the enum `ScheduleStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ScheduleStatus_new" AS ENUM ('DONE', 'CANCEL', 'OPEN');
ALTER TABLE "schedule" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "schedule" ALTER COLUMN "status" TYPE "ScheduleStatus_new" USING ("status"::text::"ScheduleStatus_new");
ALTER TYPE "ScheduleStatus" RENAME TO "ScheduleStatus_old";
ALTER TYPE "ScheduleStatus_new" RENAME TO "ScheduleStatus";
DROP TYPE "ScheduleStatus_old";
ALTER TABLE "schedule" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;
