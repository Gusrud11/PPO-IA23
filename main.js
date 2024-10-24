void async function () {
    const searchBar = document.querySelector(".search-bar");
    const inputSearch = searchBar.querySelector("input");
    const searchResults = document.querySelector(".search-results");
    const backButton = document.querySelector(".back");
    const forwardButton = document.querySelector(".forward");
    const mostradorPagina = document.querySelector(".mostrador-pagina");
    const tyler = document.querySelector("#alanjesus"); //eu tenho que consertar isso, e mudar o nome

    console.log(tyler);

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
        Disciplinas:${dados.materia};<br>
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


/* --------------------------------------------------Querido, Isaac. Acredito que a função abaixo não estava fazendo absolutamente nada alem de dar erro no codigo
window.onclick = function (event) {
  if(ev.target ===modal){
    modal.style.display = "none"
  }
}*/


// Corrigir a referência ao modal na função `pessoa.onclick`
document.addEventListener('click', function (event) {
    if (event.target.id === 'pessoa') {
        modal.style.display = "block";
    }
});

// Função pro modo escuro (E daqui pra frente o código vira uma trincheira)
function Escurecer(){
    if(this.checked == true){
        document.body.style.backgroundColor="rgb(41, 41, 54)";
        document.body.style.color="rgb(236, 236, 236)";
    }
    if(this.checked == false){
        document.body.style.backgroundColor="rgb(236, 236, 236)";
        document.body.style.color="rgb(41, 41, 54)";
    }
}

document.querySelector("#alanjesus").addEventListener('change', Escurecer);



