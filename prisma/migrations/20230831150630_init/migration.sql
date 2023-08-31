/*
  Warnings:

  - You are about to drop the column `test` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "test",
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_userId_key" ON "Users"("userId");
