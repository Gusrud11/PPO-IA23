-- CreateTable
CREATE TABLE "Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "anoPeriodo" TEXT NOT NULL,
    "turma" TEXT NOT NULL,
    "cargaHoraria" TEXT NOT NULL,
    "codigoMateria" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
