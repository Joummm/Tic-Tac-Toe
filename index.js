// Select all cells, status text, and restart button
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

// Define winning conditions for Tic Tac Toe
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Game state variables
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// Initialize the game
initializeGame();

function initializeGame() {
    // Add click event listeners to cells and restart button
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);

    // Display the current player's turn
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

// Handle cell clicks
function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    // Ignore clicks on already selected cells or if the game is over
    if (options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

// Update the cell with the current player's mark
function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Switch to the next player
function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

// Check if there is a winner or a draw
function checkWinner() {
    let roundWon = false;

    // Check each win condition
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        // Skip empty cells
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        // Check if all three cells match
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes("")) { // Check for a draw
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

// Restart the game
function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
