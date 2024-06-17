document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/players');
        if (!response.ok) throw new Error('Network response was not ok');
        const players = await response.json();

        const tableBody = document.getElementById('player-table-body');
        tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

        players.forEach(player => {
            adicionarLinhaNaTabela(player);
        });
    } catch (error) {
        console.error('Erro ao carregar jogadores:', error);
    }
});

function adicionarLinhaNaTabela(player) {
    const tableBody = document.getElementById('player-table-body');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${player.number}</td>
        <td>${player.name}</td>
        <td id="goals-${player._id}">${player.goals}</td>
        <td>
            <button onclick="adicionarGol('${player._id}')">+</button>
            <button onclick="removerGol('${player._id}')">-</button>
        </td>
        <td id="assists-${player._id}">${player.assists}</td>
        <td>
            <button onclick="adicionarAssistencia('${player._id}')">+</button>
            <button onclick="removerAssistencia('${player._id}')">-</button>
        </td>
        <td>
            <button class="btn-remove" onclick="removerLinha('${player._id}', this)">Remover</button>
        </td>
    `;

    tableBody.appendChild(row);
}

document.getElementById('player-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const number = document.getElementById('number').value;
    const name = document.getElementById('name').value;

    const player = {
        number,
        name,
        goals: 0,
        assists: 0
    };

    try {
        const response = await fetch('http://localhost:3000/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const newPlayer = await response.json();
        adicionarLinhaNaTabela(newPlayer);

        // Limpar os campos do formulário
        document.getElementById('number').value = '';
        document.getElementById('name').value = '';
    } catch (error) {
        console.error('Erro ao adicionar jogador:', error);
    }
});

async function removerLinha(id, button) {
    try {
        const response = await fetch(`http://localhost:3000/players/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Network response was not ok');
        button.closest('tr').remove();
    } catch (error) {
        console.error('Erro ao remover jogador:', error);
    }
}

async function atualizarEstatistica(id, field, value) {
    try {
        const response = await fetch(`http://localhost:3000/players/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ [field]: value })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('Estatística atualizada:', data);
    } catch (error) {
        console.error('Erro ao atualizar estatística:', error);
    }
}

function adicionarGol(id) {
    const goalsCell = document.getElementById(`goals-${id}`);
    const newValue = parseInt(goalsCell.textContent) + 1;
    goalsCell.textContent = newValue;
    atualizarEstatistica(id, 'goals', newValue);
}

function removerGol(id) {
    const goalsCell = document.getElementById(`goals-${id}`);
    if (parseInt(goalsCell.textContent) > 0) {
        const newValue = parseInt(goalsCell.textContent) - 1;
        goalsCell.textContent = newValue;
        atualizarEstatistica(id, 'goals', newValue);
    }
}

function adicionarAssistencia(id) {
    const assistsCell = document.getElementById(`assists-${id}`);
    const newValue = parseInt(assistsCell.textContent) + 1;
    assistsCell.textContent = newValue;
    atualizarEstatistica(id, 'assists', newValue);
}

function removerAssistencia(id) {
    const assistsCell = document.getElementById(`assists-${id}`);
    if (parseInt(assistsCell.textContent) > 0) {
        const newValue = parseInt(assistsCell.textContent) - 1;
        assistsCell.textContent = newValue;
        atualizarEstatistica(id, 'assists', newValue);
    }
}
