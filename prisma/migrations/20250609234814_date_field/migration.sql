/*
  Warnings:

  - Added the required column `assignee` to the `Work` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Work` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Work" ADD COLUMN     "assignee" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
