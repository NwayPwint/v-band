-- CreateTable
CREATE TABLE "interviews" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "interviews_pkey" PRIMARY KEY ("id")
);
