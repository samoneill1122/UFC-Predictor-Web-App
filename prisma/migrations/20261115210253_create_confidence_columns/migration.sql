/*
  Warnings:

  - Added the required column `confidence` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prediction" ADD COLUMN     "confidence" DOUBLE PRECISION NOT NULL;
