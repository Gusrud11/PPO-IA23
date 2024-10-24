const axios = require("axios");
const cheerio = require("cheerio");


const url = [
    'https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1629341'
    
];

const getDisciplinas = async () => {
    const listJson = [];

    try {
        const requisicoes = await Promise.all(url.map(async (url) => {
            const { data } = await axios.get(url);  // axios utiliza o método GET para acessar a página e pegar os dados
            const dataHtml = cheerio.load(data);    // cheerio carrega o HTML da página

            dataHtml('td').each((index, element) => {
                const materia = dataHtml(element).find('a').text().trim();
                
                if (materia) {
                    listJson.push({
                        materia
                    });
                }
            });
        }));

        const dataJson = JSON.stringify(listJson, null, 1);
        console.log(dataJson);

    } catch (error) {
        console.error("Erro ao realizar o scraping:", error.message);
    }
};

getDisciplinas();
