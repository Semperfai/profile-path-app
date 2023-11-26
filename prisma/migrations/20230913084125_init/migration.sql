/*
  Warnings:

  - You are about to drop the column `linksId` on the `Links` table. All the data in the column will be lost.
  - You are about to drop the `LinkItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Links` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme_id` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LinkItem" DROP CONSTRAINT "LinkItem_linkId_fkey";

-- DropForeignKey
ALTER TABLE "Links" DROP CONSTRAINT "Links_linksId_fkey";

-- AlterTable
ALTER TABLE "Links" DROP COLUMN "linksId",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "theme_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "LinkItem";

-- CreateIndex
CREATE UNIQUE INDEX "Links_userId_key" ON "Links"("userId");
