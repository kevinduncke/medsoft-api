/*
  Warnings:

  - You are about to drop the column `permissions` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "permissions";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "Permission"[];
