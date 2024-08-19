void async function () {
    const searchBar = document.querySelector(".search-bar");
    const inputSearch = searchBar.querySelector("input");
    const searchResults = document.querySelector(".search-results");
    const backButton = document.querySelector(".back");
    const forwardButton = document.querySelector(".forward");

    const response = await fetch('dados.json');
    const items = await response.json();

    // items.forEach(item => {
    //     item.id = { value: item.id };
    // });

    const itemsPerPage = 5;
    let displayIndex = 0;
    let filteredItems = [];; // Inicialmente, todos os itens são exibidos

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
            subArray[displayIndex].forEach((pessoa, idx) => {
                searchResults.innerHTML += `
                    <li data-idx=${idx}>
                        <button id="pessoa">${pessoa.nome} - 
                        <a href="mailto:${pessoa.email}">${pessoa.email}</a></button>
                    </li>
                `;
            });
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

    inputSearch.addEventListener("keyup", ev => {
        // if (ev.key === "Enter") {
        // searchFn(inputSearch.value);
        // }

        const valorDigitadoNoInput = inputSearch.value

        if (valorDigitadoNoInput.trim() == '') {
            filteredItems = []
            renderizarResultados();
            return
        }

        filteredItems = items.filter(pessoa =>
            pessoa.nome.toLowerCase().includes(valorDigitadoNoInput.toLowerCase())
        );
        
        displayIndex = 0; // Reseta para a primeira página ao realizar uma nova busca
        renderizarResultados();
    });

    // searchButton.addEventListener("click", () => {
    //    searchFn(inputSearch.value);
    //  })

    backButton.addEventListener("click", () => {
        if (displayIndex >= 0) {
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

// const modal = document.getElementById("myModal");
const modal = document.querySelector("#myModal");

// const btn = document.getElementById("myBtn");
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
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

pessoa.onclick = function () {
    modal.style.dispaly = "block"
}
