-- CreateTable
CREATE TABLE "Users" (
    "Id" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UsersJoinedCapitals" (
    "VcId" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersJoinedCapitals_pkey" PRIMARY KEY ("VcId","UserId")
);

-- AddForeignKey
ALTER TABLE "UsersJoinedCapitals" ADD CONSTRAINT "UsersJoinedCapitals_VcId_fkey" FOREIGN KEY ("VcId") REFERENCES "VC"("Id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersJoinedCapitals" ADD CONSTRAINT "UsersJoinedCapitals_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE CASCADE;
