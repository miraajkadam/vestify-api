-- CreateTable
CREATE TABLE "ProjectWallet" (
    "Id" TEXT NOT NULL,
    "Chain" "Chain" NOT NULL,
    "WalletAddress" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ProjectWallet_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectWallet_Id_key" ON "ProjectWallet"("Id");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "ProjectWallet_Project_Id" FOREIGN KEY ("Id") REFERENCES "ProjectWallet"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
