// Step 1
class Ship {
    constructor(name, size) {
        this.name = name;
        this.size = size;
        this.hits = 0;
        this.positions = [];
    }

    isSunk() {
        return this.hits >= this.size;
    }
}

// Step 2
class Board {
    constructor(size) {
        this.size = size;
        this.grid = Array(size).fill(null).map(() => Array(size).fill(' '))
        this.ships = [];
        /*
        Array(size) creates new array with length size. The elements of the array are uninitialized (undefined) so .fill(null) populates every element in the array with null
        .map to transform each element. For each 'null' element a new array is created
        Array(size).fill(' ') creates a new array with 'size' elements all initialized to a space character. This represents a row on the board where each cell is initially empty
        */
    }
    display() {
        this.grid.forEach(row => {
            console.log(row.join('|'))
        });
    }
    // Step 3
    canPlaceShip(ship, x, y, direction) {
        if (x < 0 || y < 0 ||
            (direction === 'horizontal' && x + ship.size > this.size) ||
            (direction === 'vertical' && y + ship.size > this.size)) {
                return false;
            }

        for (let i = 0; i < this.size; i++){
            if (direction === 'horizontal') {
                if (this.grid[y][x+i] !== ' '){
                    return false;
                }
            } else if (direction === 'vertical') {
                if (this.grid[y+i][x] !== ' ') {
                    return false;
                }
            }
                
        }
        return true
    }
    // Step 4
    placeShip(ship, x, y, direction) {
        if (this.canPlaceShip(ship, x, y, direction)) {
            for (let i = 0; i < ship.size; i++) {
                if (direction === 'horizontal') {
                    this.grid[y][x+i] = ship.name[0]; // place the ship on the grid and use the first letter of the ship as an indicator
                    ship.positions.push([x+i, y]);
                } else if (direction === 'vertical' ) {
                    this.grid[y+i][x] = ship.name[0];
                    ship.position.push([x, y+i]);
                }
            }
            this.ships.push(ship);
            return true; // indicate success
        }
        return false; // indicates failure if placement was not possible
    }
    // Step 4
   receiveAttack(x, y) {
    if (this.grid[y][x] === 'X' || this.grid[y][x] === 'O') {
        return false
    }
    if (this.grid[y][x] === ' ') {
        this.grid[y][x] = 'O'
        return true
    } else {
        this.grid[y][x] = 'X'
        const ship = this.ships.find(ship => ship.positions.some(pos => pos[0] === x && pos[1] === y))
        if (ship) {
            ship.hits++;
            if (ship.isSunk()) {
                console.log(`${ship.name} is sunk!`)
            }
        }
        return true;
    }
   }

}

/*Step 5*/
function getInput(prompt) {
    const readLineSync = require('readline-sync');
    return readLineSync.question(prompt);
}
function takeTurn(board) {
    xAttack = parseInt(getInput('Please enter the x axis coordinate for your attack: '));
    yAttack = parseInt(getInput('Please enter the y axis coordinate for you attack: '));
    if (board.receiveAttack(xAttack, yAttack)) {
        console.log('Board after you attack:');
        board.display();
    } else {
        console.log('Invalid attack. Try again')
        takeTurn(board);
    }
}

// Step 6
function playGame() {
    const boardSize = 10
    const playerBoard = new Board(boardSize);
    const computerBoard = new Board(boardSize);

    console.log('Place your ships on the board:');
    playerBoard.placeShip(new Ship('Destroyer', 2), 0, 0, 'horizontal');

    console.log('Computer is placing its ships...')
    computerBoard.placeShip(new Ship('Destroyer', 2), 0, 0, 'horizontal');
    
    let gameOver = false;
    while (!gameOver) {
        console.log("Player's board:");
        playerBoard.display();

        console.log("Player's turn:")
        takeTurn(computerBoard);
        if (computerBoard.ships.every(ship => ship.isSunk())) {
            console.log('You win!')
            gameOver = true;
            break;
        }
        console.log("Computer's turn:")
        takeTurn(playerBoard);
        if(playerBoard.ships.every(ship => ship.isSunk())) {
            console.log('Computer wins!')
            gameOver = true;
            break;
        }

    }
}

playGame();