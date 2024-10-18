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


// F O N C T I O N S - B A S I Q U E

for (let i=0 ; i<9; i++){ // Create 9div with "cell" class
    const div = document.createElement("div");
    div.classList.add("cell");
    board.appendChild(div);
    cells.push(div);
    div.addEventListener('click', () => actionClick(div));
}

function checkWin () {
    const boardState = cells.map(cell => cell.textContent);
    let winnerFound = false;

    for (const combination of winCombinations){
        const [a, b, c] = combination;
        if (boardState[a] && boardState [a] === boardState [b] && boardState[a] === boardState[c]){
            winnerFound = true;
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
    } else {
        currentPlayer ='X';
    }
}

function actionClick(cell){
    if (gameOn){
        if (cell.textContent === ''){
            cell.textContent = currentPlayer;
            if(checkWin()){
                message.textContent = `${currentPlayer} win the game 🎉`;
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
    });
    currentPlayer = 'X';
    gameOn = true;
    message.textContent = '';
});