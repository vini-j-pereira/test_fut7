document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/players');
    const players = await response.json();

    // Ordenar jogadores por saldo de gols
    const sortedByGoals = [...players].sort((a, b) => b.goals - a.goals);
    const goalsRankingBody = document.getElementById('goals-ranking-body');
    sortedByGoals.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.number}</td>
            <td>${player.name}</td>
            <td>${player.goals}</td>
        `;
        goalsRankingBody.appendChild(row);
    });

    // Ordenar jogadores por saldo de assistências
    const sortedByAssists = [...players].sort((a, b) => b.assists - a.assists);
    const assistsRankingBody = document.getElementById('assists-ranking-body');
    sortedByAssists.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.number}</td>
            <td>${player.name}</td>
            <td>${player.assists}</td>
        `;
        assistsRankingBody.appendChild(row);
    });
});