-- CreateTable
CREATE TABLE "Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "anoPeriodo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "cargaHoraria" TEXT NOT NULL,
    "codigoMateria" TEXT NOT NULL,
    "horario" TEXT NOT NULL
);
