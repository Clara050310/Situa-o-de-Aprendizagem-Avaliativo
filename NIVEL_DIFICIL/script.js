// Jogo da Velha

// Selecionando todas as células do tabuleiro (divs com a classe 'cell')
const cells = document.querySelectorAll('.cell');

// Definindo o jogador inicial (X) e o status do jogo (ativo ou não)
let currentPlayer = 'X';
let gameActive = true;

// Definindo as combinações de vitória no jogo (linhas, colunas e diagonais)
const winningCombinations = [
    [0, 1, 2],  // Linha 1
    [3, 4, 5],  // Linha 2
    [6, 7, 8],  // Linha 3
    [0, 3, 6],  // Coluna 1
    [1, 4, 7],  // Coluna 2
    [2, 5, 8],  // Coluna 3
    [0, 4, 8],  // Diagonal 1
    [2, 4, 6]   // Diagonal 2
];

// Função para verificar se há um vencedor
function checkWinner() {
    // Iterando pelas combinações de vitória e verificando se todas as células de uma combinação possuem o mesmo valor
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        // Verifica se as 3 células estão preenchidas e possuem o mesmo valor
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            return cells[a].innerText;  // Retorna o vencedor (X ou O)
        }
    }
    return null;  // Caso não haja vencedor
}

// Função para tratar o clique do jogador
function handleClick(event) {
    const cell = event.target;

    // Verifica se a célula já foi preenchida ou se o jogo não está mais ativo
    if (cell.innerText || !gameActive) return;

    // Preenche a célula com o símbolo do jogador atual
    cell.innerText = currentPlayer;

    // Verifica se há um vencedor após o clique
    const winner = checkWinner();
    if (winner) {
        // Exibe a mensagem de vitória e desativa o jogo
        document.getElementById('message').textContent = `${winner} venceu!`;
        gameActive = false;
    } else if ([...cells].every(cell => cell.innerText)) {
        // Se todas as células estiverem preenchidas e não houver vencedor, é um empate
        document.getElementById('message').textContent = 'Empate!';
        gameActive = false;
    } else {
        // Caso contrário, alterna o jogador
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Adiciona um event listener a cada célula para lidar com os cliques
cells.forEach(cell => cell.addEventListener('click', handleClick));
