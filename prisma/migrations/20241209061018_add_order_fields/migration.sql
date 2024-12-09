/*
  Warnings:

  - Added the required column `order` to the `NewsAndTips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `PriceList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `QuestionAnswers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Specialists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NewsAndTips" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PriceList" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "QuestionAnswers" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Reports" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Specialists" ADD COLUMN     "order" INTEGER NOT NULL;
