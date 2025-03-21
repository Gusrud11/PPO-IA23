const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
console.log("sucessor 2 vezes rapa")
const url = [
    'https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1915374'
    ];

const getDisciplinas = async () => {
    const listJSON = [];
    const novasMateria = [];
    let materia=[];
    try {
        const requisicoes = await Promise.all(url.map(async (url) => {
            const { data } = await axios.get(url);  // axios utiliza o método GET para acessar a página e pegar os dados
            const dataHtml = cheerio.load(data);    // cheerio carrega o HTML da página
           // console.log(dataHtml.html()); 
            dataHtml('.listagem tbody tr td').each((index, element) => {
                materia = dataHtml(element).find('a').text().trim();
                console.log(materia)
                listJSON.push(materia)
            });
            console.log(listJSON)
            fs.readFile("dados.json","utf8",(err,fileData)=>{
                let existingData = []

                if(!err){
                    existingData=JSON.parse(fileData)
                    console.log("zaza")
                }

                const updatedData= existingData.concat(listJSON)

                const dataJSON = JSON.stringify(updatedData,null,2)

                fs.writeFile("dados.json",dataJSON, (err) =>{
                    if(err){
                        console.error("Erro ao salvar arquivos",err)
                    }
                    if(!err){
                        console.log("Arquivo escrito e salvo",)
                    }
                })
            })

        }));

    } catch (error) {
        console.error("Erro ao realizar o scraping:", error.message);
    }
};

getDisciplinas();
