/*
  Warnings:

  - You are about to drop the column `emailVerificationExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerificationToken` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[verificationToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."User_emailVerificationToken_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "emailVerificationExpiry",
DROP COLUMN "emailVerificationToken",
ADD COLUMN     "verificationExpiry" TIMESTAMP(3),
ADD COLUMN     "verificationToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_verificationToken_key" ON "public"."User"("verificationToken");
