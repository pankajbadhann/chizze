-- DropIndex
DROP INDEX "Message_chatId_idx";

-- DropIndex
DROP INDEX "Message_createdAt_idx";

-- CreateIndex
CREATE INDEX "Message_chatId_createdAt_idx" ON "Message"("chatId", "createdAt");
