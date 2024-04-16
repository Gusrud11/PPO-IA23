const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

function showResults(results) {
    searchResults.innerHTML = '';
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result.nome;
        searchResults.appendChild(li);
    });
    searchResults.style.display = results.length ? 'block' : 'none';
}

async function main() {
    const response = await fetch('dados.json')
    const items = await response.json()

    searchInput.addEventListener('input', function () {
        const searchText = this.value.toLowerCase().trim();
        const filteredItems = items.filter(item => item.nome.toLowerCase().includes(searchText));
        showResults(filteredItems);
    });

    searchResults.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            searchInput.value = event.target.textContent;
            searchResults.style.display = 'none';
        }
    });
}

main()






// // Carregar os dados do arquivo JSON
// fetch('dados.json')
//     .then(response => response.json())
//     .then(data => {
//         const items = data;

//         searchInput.addEventListener('input', function () {
//             const searchText = this.value.toLowerCase();
//             const filteredItems = items.filter(item => item.nome.toLowerCase().includes(searchText));
//             showResults(filteredItems);
//         });

//         function showResults(results) {
//             searchResults.innerHTML = '';
//             results.forEach(result => {
//                 const li = document.createElement('li');
//                 li.textContent = result.nome;
//                 searchResults.appendChild(li);
//             });
//             searchResults.style.display = results.length ? 'block' : 'none';
//         }

//         searchResults.addEventListener('click', function (event) {
//             if (event.target.tagName === 'LI') {
//                 searchInput.value = event.target.textContent;
//                 searchResults.style.display = 'none';
//             }
//         });

//         if (searchResults === '') {
//             searchResults.style.display = 'none';
//         }
//     })

//     .catch(error => console.error('Erro ao carregar os dados:', error));