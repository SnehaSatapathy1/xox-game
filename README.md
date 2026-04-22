# XOX Game

A fun and interactive Tic-Tac-Toe game built with HTML, CSS, and JavaScript. Play against a friend, track scores, and enjoy a smooth gaming experience!

## Live Demo

Play the game here: [https://snehasatapathy1.github.io/xox-game/](https://snehasatapathy1.github.io/xox-game/)

## Features

- Custom Player Names - Enter your own names instead of generic "Player X" and "Player O"
- Score Tracking - Keep track of wins, losses, and draws across multiple games
- Game History - View your last 10 games with results
- Persistent Storage - All scores, names, and history are saved using localStorage (survives page refresh!)
- Beautiful UI - Modern design with smooth animations and hover effects
- Responsive Design - Works perfectly on desktop and mobile devices
- Win Animation - Winning cells light up with a special animation
- Easy Reset - Clear individual history or reset all data with one click

## How to Play

1. Enter player names (optional) and click "Set Names"
2. Players take turns clicking on empty cells
3. First player to get 3 in a row (horizontal, vertical, or diagonal) wins!
4. Scores update automatically
5. Click "Reset Game" to play again
6. Check your "Game History" to see past results

## Project Structure

```
xox-game/
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── script.js           # Game logic and functionality
├── favicon.ico         # Game board icon
└── README.md           # Documentation
```

## Technologies Used

- HTML5 - Structure and layout
- CSS3 - Styling, animations, and responsive design
- JavaScript (ES6) - Game logic and DOM manipulation
- LocalStorage API - Persistent data storage

## Data Storage

This game uses Browser LocalStorage to save:
- Player names
- Score counts (X wins, O wins, draws)
- Complete game history

Note: Data is stored locally in your browser and will persist across page refreshes and browser sessions. To clear data, use the "Clear History" or "Reset All Data" buttons in the game.

## Features Breakdown

### Feature 1: Set Player Names
- Customize player names before playing
- Names are saved and persist across sessions
- Default names: "Player X" and "Player O"

### Feature 2: Interactive Gameplay
- Click any empty cell to make a move
- Current player is displayed at the top
- Cells animate on hover for better UX
- Filled cells are disabled to prevent overwriting

### Feature 3: Win Detection
- Automatically detects winning combinations
- Displays winner with celebration message
- Winning cells highlight with animation
- Supports all 8 winning conditions (3 rows, 3 columns, 2 diagonals)

### Feature 4: Score & History Tracking
- Real-time score updates
- Game history shows last 10 games
- Each history entry includes result
- Separate counters for Player X wins, Player O wins, and Draws

## Responsive Design

The game works seamlessly on:
- Desktop browsers
- Tablets
- Mobile devices

## Color Scheme

- Primary Color: #667eea (Purple Blue)
- Secondary Color: #764ba2 (Dark Purple)
- Accent Color: #ff6b6b (Red for danger actions)
- Background: Gradient (Purple Blue to Dark Purple)

## Installation & Setup

### Option 1: Play Online
Simply visit: [https://snehasatapathy1.github.io/xox-game/](https://snehasatapathy1.github.io/xox-game/)

### Option 2: Run Locally

1. Clone the repository:
```
git clone https://github.com/SnehaSatapathy1/xox-game.git
```

2. Navigate to the folder:
```
cd xox-game
```

3. Open index.html in your browser (or use Live Server in VS Code)

## Game Rules

- The game is played on a 3×3 grid
- Players alternate turns, marking cells with X or O
- The first player to get three marks in a row wins
- If all 9 cells are filled with no winner, it's a draw
- Winning rows can be horizontal, vertical, or diagonal

## Game Controls

| Button | Action |
|--------|--------|
| Set Names | Save custom player names |
| Reset Game | Clear board and start new game (keeps scores) |
| Clear History | Delete all game history |
| Reset All Data | Clear everything (scores, names, history) |

## Known Issues

None currently! If you find any bugs, feel free to report them.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Sneha Satapathy
- GitHub: [@SnehaSatapathy1](https://github.com/SnehaSatapathy1)

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Future Enhancements

- Add difficulty levels (play vs. AI)
- Add sound effects
- Add leaderboard system
- Add game themes/dark mode
- Add undo/redo functionality
- Mobile app version
- Multiplayer online support

## Acknowledgments

- Inspired by the classic Tic-Tac-Toe game
- Built with modern web technologies
- Designed with a focus on user experience

---

Enjoy the game and have fun!
