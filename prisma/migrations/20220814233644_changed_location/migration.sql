/*
  Warnings:

  - You are about to drop the column `location` on the `Workshop` table. All the data in the column will be lost.
  - Added the required column `locationId` to the `Workshop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workshop" DROP COLUMN "location",
ADD COLUMN     "locationId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Location";

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workshop" ADD CONSTRAINT "Workshop_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
