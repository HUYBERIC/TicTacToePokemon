// V A R I A B L E S

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];
let currentPlayer = 'X';
const cells = [];
const board = document.querySelector(".board"); // getElByClName -> retourne un ensemble
let gameOn = true;
const message = document.querySelector(".message");
const restartButton = document.querySelector(".restart");
message.textContent = `Player ${currentPlayer} begins!`;


// F O N C T I O N S - B A S I Q U E

for (let i=0 ; i<9; i++){ // Create 9div with "cell" class
    const div = document.createElement("div");
    div.classList.add("cell");
    board.appendChild(div);
    cells.push(div);
    div.addEventListener('click', () => actionClick(div));
    div.style.borderRadius = "30px";
    div.style.border = "0px";
    board.style.gap = "10px";
}

function checkWin () {
    const boardState = cells.map(cell => cell.textContent);
    let winnerFound = false;
    for (const combination of winCombinations){
        const [a, b, c] = combination;
        if (boardState[a] && boardState [a] === boardState [b] && boardState[a] === boardState[c]){
            winnerFound = true;
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            cells[a].style.backgroundColor = "rgba(53, 54, 56,0.8)";
            cells[a].style.color = "#cb413e";
            cells[b].style.backgroundColor = "rgba(53, 54, 56,0.8)";
            cells[b].style.color = "#cb413e";
            cells[c].style.backgroundColor = "rgba(53, 54, 56,0.8)";
            cells[c].style.color = "#cb413e";
            break;
        }
    }
    return winnerFound;
}

function draw() {
    return cells.every(cell => cell.textContent !== '');
}

function switchPlayer (){ // Switch between X and O player
    if (currentPlayer === 'X'){
        currentPlayer = 'O';
        message.textContent = `It's ${currentPlayer}'s turn`;
    } else {
        currentPlayer ='X';
        message.textContent = `It's ${currentPlayer}'s turn`;
    }
}

function actionClick(cell){
    if (gameOn){
        if (cell.textContent === ''){
            cell.textContent = currentPlayer;
            cell.style.color = "#ffcb05";
            cell.style.backgroundColor = "rgba(53, 100, 174, 0.5)"
            cell.style.border = "0";
            if(checkWin()){
                message.textContent = `Team Rocket win the game 🚀`;
                message.style.color = "#cb413e";
                restartButton.style.color = "#cb413e";
                restartButton.style.backgroundColor = "rgba(53, 54, 56,0.8)";
                gameOn = false;
            } else if (draw()) {
                message.textContent = ` Draw! Rematch?🤝`;
                gameOn = false;
            }else {
                switchPlayer();
            }
    }
}
}

restartButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = "";
        cell.style.border = "";
    });
    currentPlayer = 'X';
    gameOn = true;
    message.textContent = 'It\'s Cross\'s turn!';
});