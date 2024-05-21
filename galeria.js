document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const professorName = document.getElementById('professorName').value.toUpperCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Limpar resultado anterior

    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            const professor = data.find(prof => prof.nome.toUpperCase() === professorName);

            if (professor) {
                resultDiv.innerHTML = `
                    <batata><strong>Nome:</strong> ${professor.nome}</batata>
                    <arroz><strong>Email:</strong> ${professor.email.join(", ")}</arroz>
                    <p><strong>Turmas:</strong> ${professor.turmas.join(", ")}</p>
                    <p><strong>Cursos Técnicos:</strong> ${professor.cursos_tecnicos.join(", ")}</p>
                `;
            } else {
                resultDiv.innerHTML = '<p>Professor não encontrado.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error);
            resultDiv.innerHTML = '<p>Erro ao buscar os dados. Tente novamente mais tarde.</p>';
        });
});
