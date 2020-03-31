let game;
let snake;
let head;
let ticker;

const UPDATE_TIMEOUT = 200;

// Without this flag, user can move in the direct opposite
// direction (which is not what we want) if they press the
// arrow keys quickly.
let canChangeDirection = true;

function start() {
    game = new Game(10, 10, 5, 7, 'UP');
    snake = game.snake;
    head = snake.head;

    document.getElementById('down').onclick = () => {
        changeDirection('DOWN');
    };
    document.getElementById('up').onclick = () => {
        changeDirection('UP');
    };
    document.getElementById('left').onclick = () => {
        changeDirection('LEFT');
    };
    document.getElementById('right').onclick = () => {
        changeDirection('RIGHT');
    };

    document.addEventListener("keydown", handleKeydown);
    ticker = setInterval(update, UPDATE_TIMEOUT);
    
    // TODO: Set initial size of snake while making sure it stays inside the board
    snake.move();
    snake.append();
    snake.move();
    snake.append();
    snake.move();
    snake.append();

    game.render();
}

function update() {
    snake.move();
    let foodType = game.foodType(snake.head.x, snake.head.y);
    if (foodType === 'GOOD') {
        snake.append();
        game.removeFood(snake.head.x, snake.head.y);
    } else if (foodType === 'BAD') {
        game.removeFood(snake.head.x, snake.head.y);
    }

    game.render();
    canChangeDirection = true;
}

function handleKeydown(event) {
    switch (event.code) {
        case 'ArrowLeft':
            changeDirection('LEFT');
            break;
        case 'ArrowRight':
            changeDirection('RIGHT'); 
            break;
        case 'ArrowDown':
            changeDirection('DOWN'); 
            break;
        case 'ArrowUp':
            changeDirection('UP'); 
            break;
    }
}

/**
 * Gets a string indicating the new direction of the snake. 
 * This function is called after pressing a keyboard key or 
 * after clicking an arrow-key button a mobile device. 
 */
function changeDirection(dir) {
    if (!canChangeDirection) {
        return;
    }
    switch (dir) {
        case 'LEFT':
            if (head.direction !== 'RIGHT') {
                head.setDirection('LEFT');
                canChangeDirection = false;
            }
            break;
        case 'UP':
            if (head.direction !== 'DOWN') {
                head.setDirection('UP');
                canChangeDirection = false;
            }
            break;
        case 'RIGHT':
            if (head.direction !== 'LEFT') {
                head.setDirection('RIGHT');
                canChangeDirection = false;
            }
            break;
        case 'DOWN':
            if (head.direction !== 'UP') {
                head.setDirection('DOWN');
                canChangeDirection = false;
            }
            break;
    }
}

window.onload = start;