const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
console.log("sucessor 2 vezes rapa")
const url = [
   'https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1915374',
];

const getDisciplinas = async () => {
    const listJSON = [];
    let materia = [];
    try {
        const requisicoes = await Promise.all(url.map(async (url) => {
            const { data } = await axios.get(url);  
            const dataHtml = cheerio.load(data);   
            dataHtml('.listagem tbody tr ').each((index,element) => {
                const anoPeriodo = dataHtml(element).find('td.anoPeriodo').text().trim();
                // const materiaElement = dataHtml(element).find('td a').text().trim();
                if(anoPeriodo.trim().startsWith("2025")){
                    const materia = dataHtml(element).find('td a').text().trim();
                    const InfoProf = { materia, anoPeriodo };
                    listJSON.push(InfoProf);
                }
               

            });

            console.log(listJSON);
            fs.readFile("dados.json", "utf8", (err, fileData) => {
                let existingData = [];

                if (!err) {
                    existingData = JSON.parse(fileData);
                }

                // Filtrar apenas os itens que ainda não existem no arquivo
                const uniqueData = listJSON.filter((item) => 
                    !existingData.some(existingItem => 
                        existingItem.materia === item.materia && existingItem.anoPeriodo === item.anoPeriodo
                    )
                );

                // Concatenar os novos itens únicos ao array existente
                const updatedData = existingData.concat(uniqueData);

                const dataJSON = JSON.stringify(updatedData, null, 2);

                fs.writeFile("dados.json", dataJSON, (err) => {
                    if (err) {
                        console.error("Erro ao salvar arquivos", err);
                    } else {
                        console.log("Arquivo escrito e salvo");
                    }
                });
            });

        }));

    } catch (error) {
        console.error("Erro ao realizar o scraping:", error.message);
    }
};

getDisciplinas();
