-- AddColumn
ALTER TABLE "Bingo" ADD COLUMN "year" INTEGER NOT NULL DEFAULT 2025;

-- DropIndex
DROP INDEX "Bingo_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Bingo_userId_year_key" ON "Bingo"("userId", "year");
