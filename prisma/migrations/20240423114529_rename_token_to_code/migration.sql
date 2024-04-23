/*
  Warnings:

  - You are about to drop the column `token` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `tokenExpiresAt` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "token",
DROP COLUMN "tokenExpiresAt",
ADD COLUMN     "code" TEXT,
ADD COLUMN     "codeExpiresAt" TIMESTAMP(3);
