/*
  Warnings:

  - Changed the type of `confidence` on the `Prediction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "confidence",
ADD COLUMN     "confidence" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "prediction" SET DATA TYPE TEXT;
