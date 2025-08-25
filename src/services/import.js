import { PrismaClient } from "@prisma/client";
import fs from "fs/promises"
const prisma = new PrismaClient()

async function importacao() {
   const data=JSON.parse(await fs.readFile("dados.json","utf-8"))

   for(const professor of data){
      try{
         await prisma.professor.create({
            data:professor
         })
      }
      catch(err){
        console.error(`❌ Erro durante o processo: ${err.message}`);
      }
  }
   }


importacao()
   .catch((e) =>{
   console.error(e)
   })
   .finally(async()=>{
      await prisma.$disconnect();
   })
