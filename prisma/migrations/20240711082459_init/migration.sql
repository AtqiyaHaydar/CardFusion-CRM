-- CreateTable
CREATE TABLE "InteractionsCard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "interactionHistory" TEXT[],
    "status" TEXT NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "InteractionsCard_pkey" PRIMARY KEY ("id")
);
