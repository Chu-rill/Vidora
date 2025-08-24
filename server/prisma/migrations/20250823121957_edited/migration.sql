-- CreateEnum
CREATE TYPE "public"."RoomMode" AS ENUM ('CHAT', 'VIDEO', 'BOTH');

-- CreateEnum
CREATE TYPE "public"."MessageType" AS ENUM ('TEXT', 'MEDIA', 'VOICE');

-- CreateEnum
CREATE TYPE "public"."MediaType" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO', 'FILE');

-- AlterTable
ALTER TABLE "public"."Room" ADD COLUMN     "mode" "public"."RoomMode" NOT NULL DEFAULT 'CHAT';

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."MessageType" NOT NULL DEFAULT 'TEXT',
    "content" TEXT,
    "mediaUrl" TEXT,
    "mediaType" "public"."MediaType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
