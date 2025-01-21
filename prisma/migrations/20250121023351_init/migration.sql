-- CreateTable
CREATE TABLE "Bingo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Bingo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cell" (
    "id" TEXT NOT NULL,
    "bingoId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "max" INTEGER NOT NULL,
    "actual" INTEGER NOT NULL,
    "checked" BOOLEAN NOT NULL,

    CONSTRAINT "Cell_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bingo_userId_key" ON "Bingo"("userId");

-- AddForeignKey
ALTER TABLE "Bingo" ADD CONSTRAINT "Bingo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_bingoId_fkey" FOREIGN KEY ("bingoId") REFERENCES "Bingo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
