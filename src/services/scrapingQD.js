const urlQuadro = "https://www.camboriu.ifc.edu.br/quadro-docente-2025-1/"
const arqScraping = require("../scraping.js")
const { listJSON, fs, verificacaoAno, anoAtual } = require("./scraping.js")
let email=null
$("table.waffle th.row-headers-background row-header-shim ").each((element)=>{
    email=$(element).find("td.s2").text().trim();

    verificacaoAno=anoAtual.startsWith("2025")
})