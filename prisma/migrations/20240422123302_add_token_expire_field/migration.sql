-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "tokenExpiresAt" TIMESTAMP(3),
ALTER COLUMN "token" DROP NOT NULL;
