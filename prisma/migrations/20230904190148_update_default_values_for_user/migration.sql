-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT DEFAULT '',
    "lastName" TEXT DEFAULT '',
    "age" INTEGER DEFAULT 0,
    "zipCode" TEXT DEFAULT '',
    "ethnicity" TEXT DEFAULT ''
);
INSERT INTO "new_User" ("age", "ethnicity", "firstName", "id", "lastName", "zipCode") SELECT "age", "ethnicity", "firstName", "id", "lastName", "zipCode" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
