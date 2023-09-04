/*
  Warnings:

  - You are about to drop the column `ethnicity` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT DEFAULT '',
    "lastName" TEXT DEFAULT '',
    "age" INTEGER DEFAULT 0,
    "zipCode" TEXT DEFAULT '',
    "race" TEXT DEFAULT ''
);
INSERT INTO "new_User" ("age", "firstName", "id", "lastName", "zipCode") SELECT "age", "firstName", "id", "lastName", "zipCode" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
