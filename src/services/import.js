import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { scrapeEmails } from "./scrapingEmails.js"; // função que retorna lista de { nome, email }

const prisma = new PrismaClient();

async function main() {
  // 1. Carregar professores do JSON
  const data = JSON.parse(fs.readFileSync("data/dados.json", "utf-8"));

  // 2. Scraping dos e-mails
  const emails = await scrapeEmails();

  // 3. Percorrer os professores do JSON
  for (const professor of data) {
    try {
      // Procurar email correspondente pelo nome
      const emailInfo = emails.find(
        (e) => e.nome.trim().toLowerCase() === professor.nome.trim().toLowerCase()
      );

      // Verificar duplicidade no banco (pelo nome, ou outro campo único se tiver)
      const existente = await prisma.professor.findFirst({
        where: {
          nome: professor.nome,
        },
      });

      if (!existente) {
        await prisma.professor.create({
          data: {
            nome: professor.nome,
            matricula: professor.matricula,
            disciplinas: professor.disciplinas.join(", "), // ajusta se no schema for lista
            email: emailInfo ? emailInfo.email : null,
          },
        });
        console.log(`✅ Professor ${professor.nome} inserido`);
      } else {
        console.log(`⚠️ Professor ${professor.nome} já existe, pulando...`);
      }
    } catch (err) {
      console.error(`❌ Erro com professor ${professor.nome}:`, err);
    }
  }
}

main()
  .catch((e) => console.error("Erro geral:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });
