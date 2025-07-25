const {PrismaClient}=require('@prisma/client')
const fs=require("fs");

const prisma = new PrismaClient()

async function importacao() {
   const data=JSON.parse(fs.readFileSync("dados.json","utf-8"))

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
   console.log(e)
   })
   .finally(async()=>{
      await prisma.$disconnect();
   })