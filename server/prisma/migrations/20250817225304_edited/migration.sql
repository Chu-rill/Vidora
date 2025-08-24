/*
  Warnings:

  - You are about to drop the column `verificationExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_verificationToken_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "verificationExpiry",
DROP COLUMN "verificationToken",
ADD COLUMN     "actionToken" TEXT,
ADD COLUMN     "actionTokenExpiry" TIMESTAMP(3);
