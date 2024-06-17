document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/players');
        if (!response.ok) throw new Error('Network response was not ok');
        const players = await response.json();

        // Função para ordenar jogadores por gols
        players.sort((a, b) => b.goals - a.goals);
        const goalsRankingBody = document.getElementById('goals-ranking-body');
        goalsRankingBody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados
        players.forEach((player, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.number}</td>
                <td>${player.name}</td>
                <td>${player.goals}</td>
            `;
            goalsRankingBody.appendChild(row);
        });

        // Função para ordenar jogadores por assistências
        players.sort((a, b) => b.assists - a.assists);
        const assistsRankingBody = document.getElementById('assists-ranking-body');
        assistsRankingBody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados
        players.forEach((player, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.number}</td>
                <td>${player.name}</td>
                <td>${player.assists}</td>
            `;
            assistsRankingBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar rankings:', error);
    }
});
