// Jogo da Velha
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], 
    [3, 4, 5],    
    [6, 7, 8],   
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],  
    [0, 4, 8], 
    [2, 4, 6]  
];

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            return cells[a].innerText;
        }
    }
    return null;
}

function handleClick(event) {
    const cell = event.target;
    if (cell.innerText || !gameActive) return;

    cell.innerText = currentPlayer;
    const winner = checkWinner();
    if (winner) {
        document.getElementById('message').textContent = `${winner} venceu!`;
        gameActive = false;
    } else if ([...cells].every(cell => cell.innerText)) {
        document.getElementById('message').textContent = 'Empate!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

cells.forEach(cell => cell.addEventListener('click', handleClick));

