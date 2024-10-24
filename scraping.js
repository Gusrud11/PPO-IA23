import axios from "axios"
import cheerios from "cheerio"
import fs from "fs"
const url = [
    'https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1629341'
    
];

const getDisciplinas = async () => {
    const listJSON = [];

    try {
        const requisicoes = await Promise.all(url.map(async (url) => {
            const { data } = await axios.get(url);  // axios utiliza o método GET para acessar a página e pegar os dados
            const dataHtml = cheerio.load(data);    // cheerio carrega o HTML da página

            dataHtml('.turmas-integrado td').each((index, element) => {
                const materia = dataHtml(element).find('a').text().trim();
                
                if (materia && !novasMateria.includes(materia)) {
                    novasMateria.push(materia)
                }
            });

            fs.readFile("dados.json","utf8",(err,fileData)=>{
                let existingData = []

                if(!err){
                    existingData=JSON.parse(fileData)
                }

                const updatedData= existingData.concat(listJSON)

                const dataJSON = JSON.stringfy(updateData,null,2)

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
