document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/players');
    const players = await response.json();

    const tableBody = document.getElementById('player-table-body');

    players.forEach(player => {
        adicionarLinhaNaTabela(player);
    });
});

function adicionarLinhaNaTabela(player) {
    const tableBody = document.getElementById('player-table-body');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${player.number}</td>
        <td>${player.name}</td>
        <td id="goals-${player.number}">${player.goals}</td>
        <td>
            <button onclick="adicionarGol(${player.number})">+</button>
            <button onclick="removerGol(${player.number})">-</button>
        </td>
        <td id="assists-${player.number}">${player.assists}</td>
        <td>
            <button onclick="adicionarAssistencia(${player.number})">+</button>
            <button onclick="removerAssistencia(${player.number})">-</button>
        </td>
        <td>
            <button class="btn-remove" onclick="removerLinha(this)">Remover</button>
        </td>

    `;

    tableBody.appendChild(row);
}

document.getElementById('player-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const number = document.getElementById('number').value;
    const name = document.getElementById('name').value;

    const player = {
        number,
        name,
        goals: 0,
        assists: 0
    };

    adicionarLinhaNaTabela(player);
    
    // Opcional: Enviar os dados para o servidor para persistência
    fetch('http://localhost:3000/players', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
    }).then(response => response.json()).then(data => {
        console.log('Jogador adicionado:', data);
    }).catch(error => {
        console.error('Erro ao adicionar jogador:', error);
    });

    // Limpar os campos do formulário
    document.getElementById('number').value = '';
    document.getElementById('name').value = '';
});

function removerLinha(button) {
    const row = button.parentNode.parentNode;
    const number = row.cells[0].textContent;

    row.parentNode.removeChild(row);

    // Opcional: Remover os dados do servidor
    fetch(`http://localhost:3000/players/${number}`, {
        method: 'DELETE'
    }).then(response => response.json()).then(data => {
        console.log('Jogador removido:', data);
    }).catch(error => {
        console.error('Erro ao remover jogador:', error);
    });
}

function adicionarGol(number) {
    const goalsCell = document.getElementById(`goals-${number}`);
    goalsCell.textContent = parseInt(goalsCell.textContent) + 1;

    // Opcional: Atualizar os dados no servidor
    atualizarEstatistica(number, 'goals', parseInt(goalsCell.textContent));
}

function removerGol(number) {
    const goalsCell = document.getElementById(`goals-${number}`);
    if (parseInt(goalsCell.textContent) > 0) {
        goalsCell.textContent = parseInt(goalsCell.textContent) - 1;

        // Opcional: Atualizar os dados no servidor
        atualizarEstatistica(number, 'goals', parseInt(goalsCell.textContent));
    }
}

function adicionarAssistencia(number) {
    const assistsCell = document.getElementById(`assists-${number}`);
    assistsCell.textContent = parseInt(assistsCell.textContent) + 1;

    // Opcional: Atualizar os dados no servidor
    atualizarEstatistica(number, 'assists', parseInt(assistsCell.textContent));
}

function removerAssistencia(number) {
    const assistsCell = document.getElementById(`assists-${number}`);
    if (parseInt(assistsCell.textContent) > 0) {
        assistsCell.textContent = parseInt(assistsCell.textContent) - 1;

        // Opcional: Atualizar os dados no servidor
        atualizarEstatistica(number, 'assists', parseInt(assistsCell.textContent));
    }
}

function atualizarEstatistica(number, field, value) {
    fetch(`http://localhost:3000/players/${number}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [field]: value })
    }).then(response => response.json()).then(data => {
        console.log('Estatística atualizada:', data);
    }).catch(error => {
        console.error('Erro ao atualizar estatística:', error);
    });
}