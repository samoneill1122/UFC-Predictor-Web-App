-- CreateTable
CREATE TABLE "Prediction" (
    "id" SERIAL NOT NULL,
    "fightId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "eventTitle" TEXT NOT NULL,
    "fightTitle" TEXT NOT NULL,
    "cardSection" TEXT NOT NULL,
    "prediction" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventCompleted" BOOLEAN NOT NULL DEFAULT false,
    "winner" TEXT NOT NULL,
    "ordering" INTEGER NOT NULL,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prediction_fightId_key" ON "Prediction"("fightId");

-- CreateIndex
CREATE UNIQUE INDEX "Prediction_eventId_key" ON "Prediction"("eventId");
