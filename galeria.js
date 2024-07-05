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
                    <prof><strong></strong> ${professor.nome}</prof>
                    <email><strong>Email:</strong> <a href ='mailto:${professor.email}'>${professor.email}</a></email>
                    <turma><strong>Turmas:</strong> ${professor.turmas.join(", ")}</turma>
                    <curso><strong>Cursos Técnicos:</strong> ${professor.cursos_tecnicos.join(", ")}</curso>
                    <foto><img src='none.jpg'></img></foto>
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
