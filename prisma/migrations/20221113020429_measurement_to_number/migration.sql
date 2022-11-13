/*
  Warnings:

  - You are about to alter the column `measurement` on the `Metric` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Metric" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "session" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "params" TEXT NOT NULL,
    "measurement" INTEGER NOT NULL
);
INSERT INTO "new_Metric" ("category", "dateTime", "id", "measurement", "operation", "params", "session") SELECT "category", "dateTime", "id", "measurement", "operation", "params", "session" FROM "Metric";
DROP TABLE "Metric";
ALTER TABLE "new_Metric" RENAME TO "Metric";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
