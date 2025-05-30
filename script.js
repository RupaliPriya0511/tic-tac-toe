document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const restartButton = document.getElementById("restart");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let running = true;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function updateStatus(message) {
        statusText.textContent = message;
    }

    function handleCellClick() {
        const index = this.dataset.index;

        if (board[index] !== "" || !running) return;

        board[index] = currentPlayer;
        this.textContent = currentPlayer;

        if (checkWinner()) {
            updateStatus(`Player ${currentPlayer} Wins!`);
            running = false;
        } else if (board.includes("")) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateStatus(`Player ${currentPlayer}'s Turn`);
        } else {
            updateStatus("It's a Draw!");
            running = false;
        }
    }

    function checkWinner() {
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        running = true;
        updateStatus("Player X's Turn");

        cells.forEach(cell => {
            cell.textContent = "";
        });
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", resetGame);
});
