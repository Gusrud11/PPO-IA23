import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//Quadro Docente: https://www.camboriu.ifc.edu.br/quadro-docente-2025-1/
// URLs a serem raspadas
const urls = [
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1879369",//adriana botelho barcellos
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1970752",//adriano martendal
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2771288",//afonso da luz loss
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2567107",//agata regiane quissini
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2322799",//airton zancanaro
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1989957",//alessandra farias millezi
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3449477",//alessandra heidrich
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2046449",//alexandre de aguiar amaral
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2276418",//allan charlles mendes de sousa
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1929423",//amanda moser coelho da fonseca faro
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1775472",//ana cristina franzoi
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1177254",//ana paula resende malheiro amaral
  
];
console.log("process.cwd():", process.cwd());
console.log("import.meta.url:", import.meta.url);
// console.log(urls.length);
// Caminhos dos arquivos
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.join(__filename);

const ARQUIVO_DADOS = path.join(__dirname,"../../Data/dados.json");
const ARQUIVO_BACKUP = path.join(__dirname,"../../Data/dadosBackup.json")
;

// Função principal
const getDisciplinas = async () => {
  console.log("🚀 Iniciando processo...");

  try {
    // 1. Ler dados existentes no arquivo
    let existingData = [];
    try {
      const data = await fs.readFile(ARQUIVO_DADOS, "utf8");
      existingData = JSON.parse(data);
      console.log(`✅ Dados antigos carregados. Total: ${existingData.length} registros.`);
    } catch (err) {
      if (err.code === "ENOENT") {
        console.warn("⚠️ Arquivo não encontrado. Criando novo arquivo...");
        await fs.writeFile(ARQUIVO_DADOS, "[]");
        console.log("📄 Novo arquivo criado.");
      } else {
        throw new Error(`Erro ao ler arquivo original: ${err.message}`);
      }
    }

    // 2. Fazer backup dos dados atuais
    console.log("📦 Iniciando backup...");
    try{
      await fs.writeFile(ARQUIVO_BACKUP, JSON.stringify(existingData, null, 2));
      console.log("✅ Backup realizado com sucesso.");

    }catch(err){
      throw new Error('Erro ao realizar backup: ${err.message}')
    }

    // 3. Coletar novos dados nas URLs
    const listJSON = [];

    console.log(`🔗 Iniciando scraping em ${urls.length} URLs...`);

    for (const [index, url] of urls.entries()) {
      console.log(`🌐 Processando URL ${index + 1} de ${urls.length}: ${url}`);

      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      let anoAtual = null;
      let nome=null
      $("#corpo #center #id-docente").each((index, element) => {
        nome = $(element).find("h3").text().trim();
      });

      console.log(nome);
      $("table.listagem tbody tr").each((index, element) => {
        const tdAno = $(element).find("td.anoPeriodo");
        if (tdAno.length) {
          anoAtual = tdAno.text().trim();
          return;
        }
        const codigoMateria = $(element).find("td.codigo").text().trim();
        const materia = $(element).find("td:nth-child(2) a").text().trim();
        const cargaHoraria = $(element).find("td.ch").text().trim();
        const horario = $(element).find("td.horario").text().trim();

        const verificacaoCampos =  materia  && anoAtual && nome ;
        const verificacaoAno = anoAtual && anoAtual.startsWith("2025");

        if (verificacaoCampos && verificacaoAno) {
          listJSON.push({
            anoPeriodo: anoAtual,
            nome,
            materia,
           
          });
        }
      });

      console.log(`📌 URL ${index + 1} processada. Itens coletados: ${listJSON.length}`);
    }
   
    


    // 4. Filtrar apenas os itens únicos
    console.log("🔎 Filtrando itens únicos...");

    const uniqueData = listJSON.filter(
      (item) =>
        !existingData.some(
          (existingItem) =>
            existingItem.codigoMateria === item.codigoMateria &&
            existingItem.anoPeriodo === item.anoPeriodo
        )
    );

    console.log(`➕ Adicionando ${uniqueData.length} novos itens únicos.`);

    // 5. Atualizar dados
    const updatedData = [...existingData, ...uniqueData];
    const dataJSON = JSON.stringify(updatedData, null, 2);

    console.log("💾 Salvando dados atualizados...");

    await fs.writeFile(ARQUIVO_DADOS, dataJSON);
    await fs.writeFile(ARQUIVO_BACKUP,dataJSON)

    console.log("🎉 Processo concluído com sucesso!");
    console.log(`📊 Total de registros após atualização: ${updatedData.length}`);
    console.log(`📄 Dados salvos em: ${ARQUIVO_DADOS}`);
    console.log(`📦 Backup salvo em: ${ARQUIVO_BACKUP}`);

  } catch (error) {
    console.error(`❌ Erro durante o processo: ${error.message}`);
  }
};

getDisciplinas();
