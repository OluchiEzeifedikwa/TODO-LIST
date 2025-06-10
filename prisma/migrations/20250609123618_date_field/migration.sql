/*
  Warnings:

  - Added the required column `date` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
