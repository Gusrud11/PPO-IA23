import axios from "axios";
import * as cheerio from "cherrio";
import fs from "fs/promises";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const urlEmail=[
    "https://sig.ifc.edu.br/sigaa/public/docente/portal.jsf?siape=1879369",//adriana botelho barcellos
]
const getEmail=async()=>{
    const {dataEmail}= await axios.get(urlEmail)
    const $=cheerio.load(dataEmail);

}