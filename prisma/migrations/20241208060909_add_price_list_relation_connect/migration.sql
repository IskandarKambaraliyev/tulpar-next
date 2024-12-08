/*
  Warnings:

  - You are about to drop the column `amount` on the `PriceList` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `PriceList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `PriceList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PriceList" DROP COLUMN "amount",
ADD COLUMN     "price" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PriceList_name_key" ON "PriceList"("name");
