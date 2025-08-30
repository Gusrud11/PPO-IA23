/*
  Warnings:

  - You are about to drop the column `cargaHoraria` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `codigoMateria` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `horario` on the `Professor` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "anoPeriodo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "materia" TEXT NOT NULL
);
INSERT INTO "new_Professor" ("anoPeriodo", "id", "materia", "nome") SELECT "anoPeriodo", "id", "materia", "nome" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
