-- CreateTable
CREATE TABLE "UserSocial" (
    "Id" TEXT NOT NULL,
    "X" TEXT NOT NULL,
    "Discord" TEXT NOT NULL,

    CONSTRAINT "UserSocial_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSocial_Id_key" ON "UserSocial"("Id");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "UserSocial_User_ID" FOREIGN KEY ("Id") REFERENCES "UserSocial"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
