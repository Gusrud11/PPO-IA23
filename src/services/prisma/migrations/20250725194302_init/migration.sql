-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "anoPeriodo" TEXT NOT NULL,
    "turma" TEXT NOT NULL,
    "cargaHoraria" TEXT NOT NULL,
    "codigoMateria" TEXT NOT NULL,
    "horario" TEXT NOT NULL
);
INSERT INTO "new_Professor" ("anoPeriodo", "cargaHoraria", "codigoMateria", "horario", "id", "nome", "turma") SELECT "anoPeriodo", "cargaHoraria", "codigoMateria", "horario", "id", "nome", "turma" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
