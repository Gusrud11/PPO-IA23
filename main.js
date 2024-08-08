void async function () {
    const searchBar = document.querySelector(".search-bar");
    const inputSearch = searchBar.querySelector("input");
    const searchResults = document.querySelector(".search-results");
    const searchButton = searchBar.querySelector("#search-button");
    const backButton = searchBar.querySelector(".back");
    const forwardButton = searchBar.querySelector(".forward");
    
    const response = await fetch('dados.json');
    const items = await response.json();
    
    items.forEach(item => {
        item.id = { value: item.id };
    });

    let displayIndex = 0;
    const itemsPerPage = 5;
    let filteredItems = items; // Inicialmente, todos os itens são exibidos

    function dividirArrays(array, tamanho) {
        let subArrays = [];
        for (let i = 0; i < array.length; i += tamanho) {
            subArrays.push(array.slice(i, i + tamanho));
        }
        return subArrays;
    }

    function renderizarResultados() {
        const subArray = dividirArrays(filteredItems, itemsPerPage);
        searchResults.innerHTML = "";
        
        if (subArray[displayIndex]) {
            subArray[displayIndex].forEach(pessoa => {
                searchResults.innerHTML += `
                    <li>
                        <button id="pessoa">${pessoa.nome} - 
                        <a href="mailto:${pessoa.email}">${pessoa.email}</a></button>
                    </li>
                `;
            });
        }
    }

    const searchFn = value => {
        filteredItems = items.filter(pessoa => 
            pessoa.nome.toLowerCase().includes(value.toLowerCase())
        );
        displayIndex = 0; // Reseta para a primeira página ao realizar uma nova busca
        renderizarResultados();
    };

    inputSearch.addEventListener("keydown", ev => {
        if (ev.key === "Enter") {
            searchFn(inputSearch.value);
        }
    });

    searchButton.addEventListener("click", () => {
        searchFn(inputSearch.value);
    });

    backButton.addEventListener("click", () => {
        if (displayIndex > 0) {
            displayIndex--;
            renderizarResultados();
        }
    });

    forwardButton.addEventListener("click", () => {
        const maxIndex = Math.ceil(filteredItems.length / itemsPerPage) - 1;
        if (displayIndex < maxIndex) {
            displayIndex++;
            renderizarResultados();
        }
    });

    // Renderiza os itens iniciais
    renderizarResultados();
}();

var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 