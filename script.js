// Elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const strikeLine = document.getElementById("strike-line");
const restartBtn = document.getElementById("restart");

// Game Variables
let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

// Winning combinations and strike line coordinates [a, b, c, x1, y1, x2, y2]
const winCombos = [
    [0, 1, 2, 20, 50, 280, 50],
    [3, 4, 5, 20, 150, 280, 150],
    [6, 7, 8, 20, 250, 280, 250],
    [0, 3, 6, 50, 20, 50, 280],
    [1, 4, 7, 150, 20, 150, 280],
    [2, 5, 8, 250, 20, 250, 280],
    [0, 4, 8, 25, 25, 275, 275],
    [2, 4, 6, 275, 25, 25, 275]
];

// Click on cell
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (!gameActive || board[index] !== "") return;

        // Place marker
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        // Check Winner
        for (let combo of winCombos) {
            const [a, b, c, x1, y1, x2, y2] = combo;

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                statusText.textContent = `Player ${currentPlayer} Wins!`;
                strikeLine.setAttribute("x1", x1);
                strikeLine.setAttribute("y1", y1);
                strikeLine.setAttribute("x2", x2);
                strikeLine.setAttribute("y2", y2);
                strikeLine.style.stroke = currentPlayer === "X" ? "#38bdf8" : "#fb7185";
                strikeLine.style.display = "block";
                gameActive = false;
                return;
            }
        }

        // Check Draw
        if (!board.includes("")) {
            statusText.textContent = "It's a Draw!";
            gameActive = false;
            return;
        }

        // Switch Turn
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    });
});

// Restart Game
restartBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";
    strikeLine.style.display = "none";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
});