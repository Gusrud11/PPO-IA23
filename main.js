void async function () {
    const searchBar = document.querySelector(".search-bar");
    const inputSearch = searchBar.querySelector("input");
    const searchResults = document.querySelector(".search-results");
    const backButton = document.querySelector(".back");
    const forwardButton = document.querySelector(".forward");
    const mostradorPagina = document.querySelector(".mostrador-pagina");
    const checkbox = document.querySelector("#alanjesus");

    const response = await fetch('dados.json');
    const items = await response.json();

    const itemsPerPage = 5;
    let displayIndex = 0;
    let filteredItems = [];
    let paginaAtual = 0;
 

    function mostrarPagina() {
        const totalPaginas = Math.ceil(filteredItems.length / itemsPerPage);
        backButton.style.display = paginaAtual > 1 ? "inline-block" : "none";
        forwardButton.style.display = paginaAtual < totalPaginas ? "inline-block" : "none";
        if(totalPaginas >0){
            mostradorPagina.style.display = "block";
            mostradorPagina.innerHTML =  `Página ${paginaAtual} de ${totalPaginas}`;
        }
        if(totalPaginas == 0){
            mostradorPagina.style.display = "none";
        }
    }

    function apagarButton(){
        backButton.style.display = paginaAtual =0 ? "inline-block" : "none";
        forwardButton.style.display = paginaAtual =0 ? "inline-block" : "none";
    }

    function renderizarResultados() {
        const subArray = dividirArrays(filteredItems, itemsPerPage);
        searchResults.innerHTML = "";

        if (subArray[displayIndex]) {
            subArray[displayIndex].forEach((pessoa, idx) => {
                const globlalIndex= displayIndex * itemsPerPage + idx;
                searchResults.innerHTML += `
                    <li data-idx=${globlalIndex}>
                        <button id="pessoa">${pessoa.nome} </button>
                    </li>
                `;
            });
        }
        if(paginaAtual>=1){
        mostrarPagina();
        }
        else if(paginaAtual==0){
            apagarButton();
        }
    }
     searchResults.addEventListener("click", ev => {
        ev.preventDefault()
        const li = ev.target.closest("li")
        if (!li) return
        li.style.display = "list-style-type" , "none";
        const dados = filteredItems[li.dataset.idx]
        modal.querySelector("p").innerHTML = `
        Nome: ${dados.nome}; <br>
        Email: <a href="mailto:${dados.email}">${dados.email};</a> <br>
        Cursos Técnicos: ${dados.cursos_tecnicos}; <br>
        
        Turmas: ${dados.turmas}; <br>
        `
        modal.style.display = "block";  
    })

    function dividirArrays(array, tamanho) {
        let subArrays = [];
        for (let i = 0; i < array.length; i += tamanho) {
            subArrays.push(array.slice(i, i + tamanho));
        }
        return subArrays;
    }

    inputSearch.addEventListener("keyup", ev => {
        const valorDigitadoNoInput = inputSearch.value.trim();

        if (valorDigitadoNoInput === ''  ) {
            filteredItems = [];
            paginaAtual=0;
            mostradorPagina.innerHTML=``
            renderizarResultados();
            return;
        }

        filteredItems = items.filter(pessoa =>
            pessoa.nome.toLowerCase().includes(valorDigitadoNoInput.toLowerCase())
        )
        .sort((a, b) => a.nome.localeCompare(b.nome));
       
        displayIndex = 0;
        paginaAtual = 1;  
        renderizarResultados();

    });

    backButton.addEventListener("click", () => {
        if (displayIndex > 0) {
            displayIndex--;
            paginaAtual--;
            renderizarResultados();
        }
    });

    forwardButton.addEventListener("click", () => {
        const maxIndex = Math.ceil(filteredItems.length / itemsPerPage) - 1;
        if (displayIndex < maxIndex) {
            displayIndex++;
            paginaAtual++;
            renderizarResultados();
        }
    });


    renderizarResultados();

    inputSearch.focus();
}();


// const btn = document.getElementById("myBtn");
// Funções relacionadas ao modal
const modal = document.querySelector("#myModal");

//const btn = document.querySelector("#myBtn");
//chupa btn de merda;seu coco

// const span = document.getElementsByClassName("close")[0];
// vai toma no seu cú, para de usar getElementByClasseName
// getElementById ou qualquer bosta dessas, o professor
// ensinou a usar a porra do querySelector usa esta merda
const span = document.querySelector(".close");



span.onclick = function () {
    modal.style.display = "none";
    // modal.classList.remove("open")
}

window.onclick = function (event) {
  if(ev.target ===modal){
    modal.style.display = "none"
  }
}

pessoa.onclick = function () {
    modal.style.display = "block"
}
// Corrigir a referência ao modal na função `pessoa.onclick`
document.addEventListener('click', function (event) {
    if (event.target.id === 'pessoa') {
        modal.style.display = "block";
    }
});

check_box.addEventListener('change', Escurecer);
function Escurecer(){
    if(checkbox.checked == true){
        document.body.setAttribute('style', 'background-color:rgb(41, 41, 54);');
        document.body.setAttribute('style', 'text-color:rgb(236, 236, 236);');
        console.log("Teste");
    }
};



//////Inicio Automacao

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
