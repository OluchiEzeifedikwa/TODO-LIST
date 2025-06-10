/*
  Warnings:

  - Added the required column `assignee` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "assignee" TEXT NOT NULL;
