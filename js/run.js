let game;
let snake;
let head;
let ticker;

const UPDATE_TIMEOUT = 200;

// Without this flag, user can move in the direct opposite
// direction (which is not what we want) if they press the
// arrow keys quickly.
let canChangeDirection = true;

/** Happens when the game starts. */
function start() {
    game = new Game(10, 10, 5, 7, "UP");
    snake = game.snake;
    head = snake.head;

    // TODO: Set initial size of snake while making sure it stays inside the board
    snake.move();
    snake.append();
    snake.move();
    snake.append();
    snake.move();
    snake.append();

    game.render();

    createArrowButtons();
    document.addEventListener("keydown", handleKeydown);
    ticker = setInterval(update, UPDATE_TIMEOUT);
}

/** Updates the game. */
function update() {
    snake.move();

    // check if the snake ate fruit in the last move. 
    let foodType = game.foodType(snake.head.x, snake.head.y);
    if (foodType === "GOOD") {
        snake.append();
        game.removeFood(snake.head.x, snake.head.y);
    } else if (foodType === "BAD") {
        game.removeFood(snake.head.x, snake.head.y);
    }

	// check if the player lost in the last move. 
	if (snake.hasBitItself() || game.isSnakeOutOfBounds()) {
		alert("You lost!");
	}

    game.render();
    canChangeDirection = true;
}

/** Creates buttons for controlling the snake. */
function createArrowButtons() {
    let arrowLeft = document.createElement('IMG');
    arrowLeft.src = 'images/arrow-left.png';
    arrowLeft.onclick = () => {
        changeDirection('LEFT');
    };

    let arrowRight = document.createElement('IMG');
    arrowRight.src = 'images/arrow-right.png';
    arrowRight.onclick = () => {
        changeDirection('RIGHT');
    };

    let arrowUp = document.createElement('IMG');
    arrowUp.src = 'images/arrow-up.png';
    arrowUp.onclick = () => {
        changeDirection('UP');
    };

    let arrowDown = document.createElement('IMG');
    arrowDown.src = 'images/arrow-down.png';
    arrowDown.onclick = () => {
        changeDirection('DOWN');
    };

    let div = document.createElement('DIV');
    div.id = 'arrow-buttons';
    div.appendChild(arrowLeft);
    div.appendChild(arrowRight);
    div.appendChild(arrowUp);
    div.appendChild(arrowDown);
    document.getElementById('container').appendChild(div);
}

/** Allows arrow keys to control the snake. */
function handleKeydown(event) {
    switch (event.code) {
        case "ArrowLeft":
            changeDirection("LEFT");
            break;
        case "ArrowRight":
            changeDirection("RIGHT");
            break;
        case "ArrowDown":
            changeDirection("DOWN");
            break;
        case "ArrowUp":
            changeDirection("UP");
            break;
    }
}

/**
 * Gets a string indicating the new direction of the snake.
 * This function is called after pressing a keyboard key or
 * after clicking an arrow-key button on a mobile device.
 */
function changeDirection(dir) {
    if (!canChangeDirection) {
        return;
    }
    switch (dir) {
        case "LEFT":
            if (head.direction !== "RIGHT") {
                head.setDirection("LEFT");
                canChangeDirection = false;
            }
            break;
        case "UP":
            if (head.direction !== "DOWN") {
                head.setDirection("UP");
                canChangeDirection = false;
            }
            break;
        case "RIGHT":
            if (head.direction !== "LEFT") {
                head.setDirection("RIGHT");
                canChangeDirection = false;
            }
            break;
        case "DOWN":
            if (head.direction !== "UP") {
                head.setDirection("DOWN");
                canChangeDirection = false;
            }
            break;
    }
}

window.onload = start;
