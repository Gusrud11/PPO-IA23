const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = [
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1915374",
];

const getDisciplinas = async () => {
  const listJSON = [];
  try {
    const requisicoes = await Promise.all(
      url.map(async (url) => {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let anoAtual = null;

        $("table.listagem tbody tr").each((index, element) => {
          const tdAno = $(element).find("td.anoPeriodo");
          if (tdAno.length) {
            anoAtual = tdAno.text().trim();
            //console.log(anoAtual)
            return;
          }

          const codigo = $(element).find("td.codigo").text().trim();
          const nome = $(element).find("td:nth-child(2) a").text().trim();
          const cargaHoraria = $(element).find("td.ch").text().trim();
          const horario = $(element).find("td.horario").text().trim();

          const verificacaoCampos = codigo && nome && cargaHoraria && horario && anoAtual;
          const verificacaoAno = anoAtual.startsWith("2025")

          if (verificacaoCampos && verificacaoAno) {
            listJSON.push({
              anoPeriodo: anoAtual,
              codigo,
              nome,
              cargaHoraria,
              horario,
            });
          }
        });

        // Leitura do arquivo existente
        fs.readFile("dados.json", "utf8", (err, fileData) => {
          let existingData = [];

          if (!err && fileData) {
            existingData = JSON.parse(fileData);
          }

          // Filtrar apenas os itens únicos
          const uniqueData = listJSON.filter(
            (item) =>
              !existingData.some(
                (existingItem) =>
                  existingItem.codigo === item.codigo &&
                  existingItem.anoPeriodo === item.anoPeriodo
              )
          );

          // Concatenar e salvar
          const updatedData = existingData.concat(uniqueData);
          const dataJSON = JSON.stringify(updatedData, null, 2);

          fs.writeFile("dados.json", dataJSON, (err) => {
            if (err) {
              console.error("Erro ao salvar arquivos", err);
            } else {
              console.log("Arquivo atualizado com sucesso!");
            }
          });
        });
      })
    );
  } catch (error) {
    console.error("Erro ao realizar o scraping:", error.message);
  }
};

getDisciplinas();
