void async function () {
    const searchBar = document.querySelector(".search-bar");
    const inputSearch = searchBar.querySelector("input");
    const searchResults = document.querySelector(".search-results");
    const backButton = document.querySelector(".back");
    const forwardButton = document.querySelector(".forward");
    const mostradorPagina = document.querySelector(".mostrador-pagina");

    const response = await fetch('dados.json');
    const items = await response.json();

    const itemsPerPage = 5;
    let displayIndex = 0;
    let filteredItems = [];
    let paginaAtual = 0;
 

    function mostrarPagina() {
        const totalPaginas = Math.ceil(filteredItems.length / itemsPerPage);
        // Atualiza a exibição dos botões
        backButton.style.display = paginaAtual > 1 ? "inline-block" : "none";
        forwardButton.style.display = paginaAtual < totalPaginas ? "inline-block" : "none";

        // Atualiza o mostrador de página
        mostradorPagina.innerHTML = `Página ${paginaAtual} de ${totalPaginas}`;
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
                searchResults.innerHTML += `
                    <li data-idx=${idx}>
                        <button id="pessoa">${pessoa.nome} - 
                        <a href="mailto:${pessoa.email}">${pessoa.email}</a></button>
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
        const dados = filteredItems[li.dataset.idx]
        modal.querySelector("p").innerHTML = dados.turmas  
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

        if (valorDigitadoNoInput === '') {
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
const btn = document.querySelector("#myBtn");

// const span = document.getElementsByClassName("close")[0];
// vai toma no seu cú, para de usar getElementByClasseName
// getElementById ou qualquer bosta dessas, o professor
// ensinou a usar a porra do querySelector usa esta merda
const span = document.querySelector(".close");

btn.onclick = function () {
    modal.style.display = "block";
    // modal.classList.add("open")
}

span.onclick = function () {
    modal.style.display = "none";
    // modal.classList.remove("open")
}

window.onclick = function (event) {
  if(ev.target ==modal){
    modal.style.display = "none"
  }
}

pessoa.onclick = function () {
    modal.style.dispaly = "block"
}
// Corrigir a referência ao modal na função `pessoa.onclick`
document.addEventListener('click', function (event) {
    if (event.target.id === 'pessoa') {
        modal.style.display = "block";
    }
});