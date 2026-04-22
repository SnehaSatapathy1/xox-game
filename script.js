// ===== GAME STATE =====
// Track the current player
let currentPlayer = 'X';
// Track the game board state (9 cells)
let gameBoard = ['', '', '', '', '', '', '', '', ''];
// Track if the game is currently active
let gameActive = true;
// Store player names
let playerXName = 'Player X';
let playerOName = 'Player O';
// Store scores
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;
// Store game history
let gameHistory = [];

// ===== WINNING CONDITIONS =====
// All possible ways to win (rows, columns, diagonals)
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// ===== GET DOM ELEMENTS =====
const cells = document.querySelectorAll('.cell');
const resultDiv = document.getElementById('result');
const currentPlayerSpan = document.getElementById('current-player');
const resetBtn = document.getElementById('reset-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const resetAllBtn = document.getElementById('reset-all-btn');
const setNamesBtn = document.getElementById('set-names-btn');
const playerXInput = document.getElementById('player-x-name');
const playerOInput = document.getElementById('player-o-name');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');
const scoreDrawsDisplay = document.getElementById('score-draws');
const historyList = document.getElementById('history-list');
const playerXDisplay = document.getElementById('player-x-display');
const playerODisplay = document.getElementById('player-o-display');

// ===== LOCALSTORAGE KEYS =====
// Define keys for localStorage to keep them organized
const STORAGE_KEYS = {
    PLAYER_X_NAME: 'xoxGame_playerXName',
    PLAYER_O_NAME: 'xoxGame_playerOName',
    SCORE_X: 'xoxGame_scoreX',
    SCORE_O: 'xoxGame_scoreO',
    SCORE_DRAW: 'xoxGame_scoreDraw',
    GAME_HISTORY: 'xoxGame_history'
};

// ===== INITIALIZE GAME =====
// Load all data from localStorage on page load
function initializeGame() {
    // Load player names from localStorage
    playerXName = localStorage.getItem(STORAGE_KEYS.PLAYER_X_NAME) || 'Player X';
    playerOName = localStorage.getItem(STORAGE_KEYS.PLAYER_O_NAME) || 'Player O';
    
    // Load scores from localStorage
    scoreX = parseInt(localStorage.getItem(STORAGE_KEYS.SCORE_X)) || 0;
    scoreO = parseInt(localStorage.getItem(STORAGE_KEYS.SCORE_O)) || 0;
    scoreDraw = parseInt(localStorage.getItem(STORAGE_KEYS.SCORE_DRAW)) || 0;
    
    // Load game history from localStorage
    const savedHistory = localStorage.getItem(STORAGE_KEYS.GAME_HISTORY);
    gameHistory = savedHistory ? JSON.parse(savedHistory) : [];
    
    // Update all displays with loaded data
    playerXInput.value = playerXName;
    playerOInput.value = playerOName;
    playerXDisplay.textContent = playerXName;
    playerODisplay.textContent = playerOName;
    currentPlayerSpan.textContent = playerXName;
    updateScoreDisplay();
    updateHistory();
}

// ===== EVENT LISTENERS =====
// Add click event to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Reset button
resetBtn.addEventListener('click', resetGame);

// Clear history button
clearHistoryBtn.addEventListener('click', clearHistory);

// Set player names button
setNamesBtn.addEventListener('click', setPlayerNames);

// Reset all data button
resetAllBtn.addEventListener('click', resetAllData);

// ===== FEATURE 1: SET PLAYER NAMES =====
// Allow players to enter custom names and save to localStorage
function setPlayerNames() {
    const xName = playerXInput.value.trim() || 'Player X';
    const oName = playerOInput.value.trim() || 'Player O';
    
    playerXName = xName;
    playerOName = oName;
    
    // Save player names to localStorage (PERSISTENT)
    localStorage.setItem(STORAGE_KEYS.PLAYER_X_NAME, playerXName);
    localStorage.setItem(STORAGE_KEYS.PLAYER_O_NAME, playerOName);
    
    // Update display
    playerXDisplay.textContent = playerXName;
    playerODisplay.textContent = playerOName;
    currentPlayerSpan.textContent = playerXName;
    
    resetGame();
}

// ===== FEATURE 2: HANDLE CELL CLICK =====
// Process when a player clicks on a cell
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    // Check if cell is empty and game is still active
    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    // Update game board and cell visually
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer === 'X' ? 'X' : 'O';
    cell.classList.add(currentPlayer.toLowerCase());
    cell.classList.add('filled'); // Mark cell as filled

    // Check if this move resulted in a win or draw
    checkGameResult();

    // Switch to the other player if game is still active
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        const displayName = currentPlayer === 'X' ? playerXName : playerOName;
        currentPlayerSpan.textContent = displayName;
    }
}

// ===== FEATURE 3: CHECK GAME RESULT =====
// Determine if someone won or if it's a draw
function checkGameResult() {
    let gameWon = false;
    let winningCells = [];

    // Check all winning conditions
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        
        // Skip if any cell in this condition is empty
        if (gameBoard[a] === '' || gameBoard[b] === '' || gameBoard[c] === '') {
            continue;
        }
        
        // Check if all three cells have the same player
        if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            gameWon = true;
            winningCells = [a, b, c];
            break;
        }
    }

    // If someone won
    if (gameWon) {
        const winnerName = currentPlayer === 'X' ? playerXName : playerOName;
        resultDiv.textContent = `🎉 ${winnerName} Wins!`;
        
        // Add animation to winning cells
        winningCells.forEach(index => {
            cells[index].classList.add('winner');
        });
        
        // Update score
        if (currentPlayer === 'X') {
            scoreX++;
            // Save updated score to localStorage (PERSISTENT)
            localStorage.setItem(STORAGE_KEYS.SCORE_X, scoreX);
        } else {
            scoreO++;
            // Save updated score to localStorage (PERSISTENT)
            localStorage.setItem(STORAGE_KEYS.SCORE_O, scoreO);
        }
        
        // Add to history and save to localStorage
        gameHistory.unshift(`${winnerName} won`);
        localStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(gameHistory));
        
        updateHistory();
        updateScoreDisplay();
        
        gameActive = false;
        return;
    }

    // Check if the board is full (draw)
    if (!gameBoard.includes('')) {
        resultDiv.textContent = "🤝 It's a Draw!";
        scoreDraw++;
        
        // Save updated draw score to localStorage (PERSISTENT)
        localStorage.setItem(STORAGE_KEYS.SCORE_DRAW, scoreDraw);
        
        // Add to history and save to localStorage
        gameHistory.unshift('Draw');
        localStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(gameHistory));
        
        updateHistory();
        updateScoreDisplay();
        
        gameActive = false;
        return;
    }
}

// ===== FEATURE 4: UPDATE SCORE DISPLAY =====
// Update the score board on screen
function updateScoreDisplay() {
    scoreXDisplay.textContent = scoreX;
    scoreODisplay.textContent = scoreO;
    scoreDrawsDisplay.textContent = scoreDraw;
}

// ===== FEATURE 4: UPDATE GAME HISTORY =====
// Add game results to history list
function updateHistory() {
    historyList.innerHTML = '';
    gameHistory.slice(0, 10).forEach((result, index) => { // Show last 10 games
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${result}`;
        historyList.appendChild(li);
    });
}

// ===== RESET GAME =====
// Clear the board and prepare for a new game (keeps scores and history)
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    resultDiv.textContent = '';
    
    const displayName = playerXName;
    currentPlayerSpan.textContent = displayName;

    // Clear all cells
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'filled', 'winner');
    });
}

// ===== CLEAR HISTORY =====
// Delete all game history records from localStorage
function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        gameHistory = [];
        // Clear history from localStorage (PERSISTENT)
        localStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(gameHistory));
        historyList.innerHTML = '';
    }
}

// ===== RESET ALL DATA =====
// Clear everything: scores, names, and history (hard reset)
function resetAllData() {
    if (confirm('Are you sure? This will clear ALL data (scores, names, and history)!')) {
        // Reset variables
        playerXName = 'Player X';
        playerOName = 'Player O';
        scoreX = 0;
        scoreO = 0;
        scoreDraw = 0;
        gameHistory = [];
        
        // Clear everything from localStorage
        localStorage.removeItem(STORAGE_KEYS.PLAYER_X_NAME);
        localStorage.removeItem(STORAGE_KEYS.PLAYER_O_NAME);
        localStorage.removeItem(STORAGE_KEYS.SCORE_X);
        localStorage.removeItem(STORAGE_KEYS.SCORE_O);
        localStorage.removeItem(STORAGE_KEYS.SCORE_DRAW);
        localStorage.removeItem(STORAGE_KEYS.GAME_HISTORY);
        
        // Update UI
        playerXInput.value = playerXName;
        playerOInput.value = playerOName;
        playerXDisplay.textContent = playerXName;
        playerODisplay.textContent = playerOName;
        updateScoreDisplay();
        updateHistory();
        resetGame();
    }
}

// ===== RUN ON PAGE LOAD =====
// Initialize the game with localStorage data
initializeGame();
