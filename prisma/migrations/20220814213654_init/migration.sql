-- CreateEnum
CREATE TYPE "WorkshopType" AS ENUM ('FUSION', 'CLASSICAL', 'BOLLYWOOD');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('PHILADELPHIA', 'BOSTON', 'CHICAGO', 'BALTIMORE', 'PITTSBURGH', 'CHARLOTTE', 'WASHINGTON_DC', 'NEW_YORK');

-- CreateTable
CREATE TABLE "Dancer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "description" TEXT,
    "picture" TEXT,

    CONSTRAINT "Dancer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workshop" (
    "id" TEXT NOT NULL,
    "location" "Location" NOT NULL,
    "active" BOOLEAN NOT NULL,
    "type" "WorkshopType" NOT NULL,
    "full" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "signup" TEXT NOT NULL,
    "dancerId" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToWorkshop" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWorkshop_AB_unique" ON "_UserToWorkshop"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWorkshop_B_index" ON "_UserToWorkshop"("B");

-- AddForeignKey
ALTER TABLE "Workshop" ADD CONSTRAINT "Workshop_dancerId_fkey" FOREIGN KEY ("dancerId") REFERENCES "Dancer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkshop" ADD CONSTRAINT "_UserToWorkshop_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkshop" ADD CONSTRAINT "_UserToWorkshop_B_fkey" FOREIGN KEY ("B") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
