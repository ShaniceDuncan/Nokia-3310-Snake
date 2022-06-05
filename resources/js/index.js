let grid = document.querySelector('.grid');
let popup = document.querySelector('.popup');
let playAgain = document.querySelector('.playAgain');
let scoreDisplay = document.querySelector('.scoreDisplay')
let up = document.querySelector('.up');
let down = document.querySelector('.down');
let left = document.querySelector('.left');
let right = document.querySelector('.right');
let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

// Listens for HTML content loaded, then watches for keyboard clicks //
document.addEventListener('DOMContentLoaded', function() {
    playAgain.innerHTML = 'Click to Start';
    playAgain.addEventListener('click', replay);
});

// Creates the game board //
function createBoard() {
    popup.style.display = 'none';
    for (let i = 0; i < 100; i++) {
        let div = document.createElement('div');
        grid.appendChild(div);
    }
};

function startGame() {
    score = 0;
    let squares = document.querySelectorAll('.grid div');
    randomApple(squares);
    //random appple //
    direction = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add('snake'));
    interval = setInterval(moveOutcome, intervalTime);
};

// Checks if we hit something //
function moveOutcome() {
    let squares = document.querySelectorAll('.grid div');
    if (checkForHits(squares)) {
        alert('You hit something!');
        playAgain.innerHTML = 'Play Again';
        popup.style.top = '10.3125rem';
        popup.style.display = 'flex';
        return clearInterval(interval);
    } else {
        moveSnake(squares);
    }
};

// Moves the snake by removing last element of currentSnake array and adding a new value to the beginning of that array //
function moveSnake(squares) {
    let tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);
    // movement ends here //
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add('snake');
};

// Checks that the snake hasn't hit the wall or itself, else it will continue to move //
function checkForHits(squares) {
    if ((currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        return true;
    } else {
        return false;
       }
};

function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        randomApple(squares);
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcome, intervalTime)
    }
};

// Picks a random spot to place our apple and checks if the spot already contains a snake //
function randomApple(squares) {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}

document.addEventListener('keydown', function(event) {
    const theKey = event.code;
    switch (theKey) {
        case 'ArrowUp':
            // Up pressed, snake will go up ten divs //
            direction = -width;
            break;
        case 'ArrowDown':
            // Down pressed, snake will go down 10 divs //
            direction = +width
            break;
        case 'ArrowLeft':
            // Left pressed, snake will go left one div //
            direction = -1
            break;
        case 'ArrowRight':
            // Right pressed, snake will go right one div //
            direction = 1;
            break;
    }
});

up.addEventListener('click', () => (direction = -width));
down.addEventListener('click', () => (direction = +width));
left.addEventListener('click', () => (direction = -1));
right.addEventListener('click', () => (direction = 1));

function replay() {
    grid.innerHTML = "";
    createBoard();
    startGame();
    popup.style.display = 'none';
};
