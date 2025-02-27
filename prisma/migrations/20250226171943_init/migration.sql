/*
  Warnings:

  - You are about to alter the column `value` on the `Msgs` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Msgs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isHot" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Msgs" ("createdAt", "id", "isDeleted", "isHot", "key", "updatedAt", "value") SELECT "createdAt", "id", "isDeleted", "isHot", "key", "updatedAt", "value" FROM "Msgs";
DROP TABLE "Msgs";
ALTER TABLE "new_Msgs" RENAME TO "Msgs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
