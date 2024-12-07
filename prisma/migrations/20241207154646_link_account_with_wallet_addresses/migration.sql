-- CreateTable
CREATE TABLE "Wallet" (
    "Address" TEXT NOT NULL,
    "Chain" "Chain" NOT NULL,
    "accountsId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_Address_key" ON "Wallet"("Address");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_accountsId_fkey" FOREIGN KEY ("accountsId") REFERENCES "Accounts"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
