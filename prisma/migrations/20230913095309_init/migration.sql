/*
  Warnings:

  - Changed the type of `userId` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Links_userId_key";

-- DropIndex
DROP INDEX "Users_userId_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;
