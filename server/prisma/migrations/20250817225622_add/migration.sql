/*
  Warnings:

  - A unique constraint covering the columns `[actionToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_actionToken_key" ON "public"."User"("actionToken");
