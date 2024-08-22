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
    let paginaAtual = 1;

    function mostrarPagina() {
        const totalPaginas = Math.ceil(filteredItems.length / itemsPerPage);

        // Atualiza a exibição dos botões
        backButton.style.display = paginaAtual > 1 ? "inline-block" : "none";
        forwardButton.style.display = paginaAtual < totalPaginas ? "inline-block" : "none";

        // Atualiza o mostrador de página
        mostradorPagina.innerHTML = `Página ${paginaAtual} de ${totalPaginas}`;
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
        mostrarPagina();
    }

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
            renderizarResultados();
            return;
        }

        filteredItems = items.filter(pessoa =>
            pessoa.nome.toLowerCase().includes(valorDigitadoNoInput.toLowerCase())
        );

        displayIndex = 0;
        paginaAtual = 1;  // Reseta a página atual
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

    // Renderiza os itens iniciais
    renderizarResultados();

    // Foca automaticamente no campo de input ao carregar a página
    inputSearch.focus();
}();

// Funções relacionadas ao modal
const modal = document.querySelector("#myModal");
const btn = document.querySelector("#myBtn");
const span = document.querySelector(".close");

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Corrigir a referência ao modal na função `pessoa.onclick`
document.addEventListener('click', function (event) {
    if (event.target.id === 'pessoa') {
        modal.style.display = "block";
    }
});
