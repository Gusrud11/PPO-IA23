import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importacao() {
   const filePath = path.resolve(__dirname, "dados.json");
   console.log("📄 Lendo arquivo:", filePath);

   let raw;
   try {
      raw = await fs.readFile(filePath, "utf-8");
   } catch (err) {
      console.error("❌ Não foi possível ler o arquivo de dados:", err.message);
      return;
   }

   let data;
   try {
      data = JSON.parse(raw);
   } catch (err) {
      console.error("❌ JSON inválido:", err.message);
      return;
   }

   if (!Array.isArray(data)) {
      console.error("❌ O conteúdo do arquivo não é um array.");
      return;
   }

   console.log(`🔎 Registros encontrados no arquivo: ${data.length}`);

   let sucesso = 0;
   let ignorados = 0;
   let erros = 0;

   for (const original of data) {
      // Mapeia campos para o modelo Professor.
      const registro = {
         anoPeriodo: original.anoPeriodo ?? null,
         nome: original.nome ?? null,
         materia: original.materia ?? original.turma ?? null, // usa turma como fallback
      };
      const validationRegistro=registro.filter(
         (item)
      )
      // Validação básica de campos obrigatórios (schema exige todos como String não-null).
      const faltando = Object.entries(registro)
         .filter(([_, v]) => v === null || v === undefined || v === "")
         .map(([k]) => k);

      if (faltando.length) {
         ignorados++;
         console.warn(
            `⚠️  Registro ignorado por faltar campos obrigatórios (${faltando.join(", ")}). Dados:`,
            original
         );
         continue;
      }

      try {
         await prisma.professor.create({ data: registro });
         sucesso++;
      } catch (err) {
         erros++;
         console.error(`❌ Erro ao inserir ( nome=${registro.nome}): ${err.message}`);
      }
   }

   console.log("——— Resumo da Importação ———");
   console.log(`✅ Inseridos: ${sucesso}`);
   console.log(`⚠️  Ignorados (faltando campos): ${ignorados}`);
   console.log(`❌ Erros de inserção: ${erros}`);
}

importacao()
   .catch((e) => {
      console.error("❌ Erro inesperado na importação:", e);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
