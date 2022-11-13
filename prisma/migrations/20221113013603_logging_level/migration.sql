/*
  Warnings:

  - Added the required column `level` to the `LogEntry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LogEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "level" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "message" TEXT NOT NULL
);
INSERT INTO "new_LogEntry" ("dateTime", "id", "message", "session") SELECT "dateTime", "id", "message", "session" FROM "LogEntry";
DROP TABLE "LogEntry";
ALTER TABLE "new_LogEntry" RENAME TO "LogEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
