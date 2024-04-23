void async function () {
    const searchBar = document.querySelector(".search-bar")
    const inputSearch = searchBar.querySelector("input")
    const searchResults = document.querySelector(".search-results")
    const response = await fetch('dados.json')
    const items = await response.json()

    const searchFn = value => {
        const pessoasFiltradas = items.filter(pessoa => pessoa.nome.toLowerCase().includes(value.toLowerCase()))
        searchResults.innerHTML = ""
        pessoasFiltradas.forEach(pessoa => {
            searchResults.innerHTML += `
                <li>
                    ${pessoa.nome} - 
                    ${pessoa.email}
                </li>
            `
        })
    }

    inputSearch.addEventListener("keydown", ev => {
        if (ev.key == "Enter") {
            searchFn(inputSearch.value)
        }
    })
}();