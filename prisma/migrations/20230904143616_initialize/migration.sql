-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT,
    "lastName" TEXT,
    "age" INTEGER,
    "zipCode" TEXT,
    "ethnicity" TEXT
);

-- CreateTable
CREATE TABLE "PersonalityResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "OpennessScore" INTEGER NOT NULL,
    "ConscientiousnessScore" INTEGER NOT NULL,
    "ExtraversionScore" INTEGER NOT NULL,
    "AgreeablenessScore" INTEGER NOT NULL,
    "NeuroticismScore" INTEGER NOT NULL,
    CONSTRAINT "PersonalityResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
