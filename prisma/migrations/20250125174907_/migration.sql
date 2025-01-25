/*
  Warnings:

  - You are about to drop the column `private` on the `Cell` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cell" DROP COLUMN "private",
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT true;
