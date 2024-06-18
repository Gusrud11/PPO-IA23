void async function () {
    const searchBar = document.querySelector(".search-bar");
    const inputSearch = searchBar.querySelector("input");
    const searchResults = document.querySelector(".search-results");
    const searchButton = searchBar.querySelector(".search-button");
    const backButton = searchBar.querySelector(".back");
    const forwardbutton = searchBar.querySelector(".forward")
    const response = await fetch('dados.json');
    const items = await response.json();

    var pessoasFiltradas=[];
    var displayindex=0;
    const searchFn = value => {
        const pessoasFiltradas = items.filter(pessoa => 
            pessoa.nome.toLowerCase().includes(value.toLowerCase())
        );
        searchResults.innerHTML = "";
        pessoasFiltradas.forEach(pessoa => {
            searchResults.innerHTML += `
                <li>
                  <button id="pessoa">  ${pessoa.nome} - 
                    ${pessoa.email} </button>
                </li>
            `;
        });
    };
    var displayindex=0;
    displayResults();

    inputSearch.addEventListener("keydown", ev => {
        if (ev.key === "Enter") {
            searchFn(inputSearch.value);
        }
    });

    searchButton.addEventListener("click", () => {
        searchFn(inputSearch.value);
    });
}();

backButton.addEventListener("click", () =>{
    if(displayindex + 5 < pessoasFiltradas.Lenght){
        displayindex += 5;
        displayResults();
    }
})
forwardbutton.addEventListener("click", () =>{
    if(displayindex - 5 >= 0){
        displayindex -= 5;
        displayResults();
    }
}