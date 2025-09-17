import axios from "axios";
import * as cheerio from "cherrio";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const urlEmail=[
    "https://sig.ifc.edu.br/sigaa/public/docente/portal.jsf?siape=1879369",//adriana botelho barcellos
]
console.log("import.meta.url",import.meta.url);

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.join(__filename);

const ARQUIVO_DADOS=path.join(__dirname,"../../Data/dados.json");

const getEmail=async()=>{
    const {dataEmail}= await axios.get(urlEmail)
    const $=cheerio.load(dataEmail);
    try{
        let existingDataEmail=[]
        dataEmail=fs.readFile(ARQUIVO_DADOS,"utf8")
        existingDataEmail.JSON.parse(dataEmail);
        console.log(`Arquivos antigos carregados e lidos ${existingDataEmail}`)
    }
    catch(err){
        console.log(`${err.message}`);
    }

    try{
        $("#ext-gen6 #container #container-inner #corpo #center #contato").each((index,element)=>
        {
            const endProfissional=$(element).find("dl dd").text().trim();
            const sala=$(element).find("dl dd i").text().trim();
            const endEletronico=$(element).find("dl dd").text().trim();
        })
    }
    catch(err){
        console.log(`${err.message}`)
    }
    try{
        
    }
}