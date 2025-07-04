const {PrismaClient}=require('@prisma/client')
const fs=require("fs");

async function importacao() {
   const data=JSON.parse(fs.readFileSync("data.json","utf-8"))

   for(const Prof of data){
      try{
         await Prisma.professor.create({
            data:professor
         })
      }
      catch(err){
         console.log('Erro ao importar ${err.message}')
      }
   }
   //terminar a importacao usando chat gpt 
}

main()
   .finally(async()=>{
      await prisma.$disconnect();
   })