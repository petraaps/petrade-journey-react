-- CreateEnum
CREATE TYPE "Posisi" AS ENUM ('Buy', 'Sell');

-- CreateEnum
CREATE TYPE "HasilTrade" AS ENUM ('Win', 'Loss', 'Break Even');

-- CreateTable
CREATE TABLE "trades" (
    "id" TEXT NOT NULL,
    "tanggal" DATE NOT NULL,
    "pair" VARCHAR(20) NOT NULL,
    "posisi" "Posisi" NOT NULL,
    "lotSize" DECIMAL(18,2) NOT NULL,
    "hasil" "HasilTrade" NOT NULL,
    "profitLoss" DECIMAL(18,2) NOT NULL,
    "catatan" VARCHAR(2000) NOT NULL DEFAULT '',
    "sesuaiRencana" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "trades_tanggal_createdAt_idx" ON "trades"("tanggal", "createdAt");
