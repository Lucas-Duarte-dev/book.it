-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "recommends" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);
