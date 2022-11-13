-- CreateTable
CREATE TABLE "LogEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "session" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "message" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "session" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "params" TEXT NOT NULL,
    "measurement" TEXT NOT NULL
);
