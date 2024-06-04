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
                let emailButtons = professor.email.map(email => `<button type="button">${email}</button>`).join("");

                resultDiv.innerHTML = `
                    <prof><strong>Nome:</strong> ${professor.nome}</prof>
                    <email><strong>Email:</strong> ${emailButtons}</email>
                    <turma><strong>Turmas:</strong> ${professor.turmas.join(", ")}</turma>
                    <curso><strong>Cursos Técnicos:</strong> ${professor.cursos_tecnicos.join(", ")}</curso>
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
