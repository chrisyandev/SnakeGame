let game;
let board;
let snake;
let head;
let ticker;

// Without this flag, user can move in the opposite 
// direction (which is not what we want) if they
// press the arrow keys quickly.
let canChangeDirection = true;

function start() {
    game = new Game(10, 10, 5, 7, 'UP');
    board = game.board;
    snake = game.snake;
    head = snake.head;
    document.addEventListener("keydown", changeDirection);
    ticker = setInterval(update, 500);
    board.create();
    game.render();

    // TODO: Set initial size of snake while making sure it stays inside the board
    snake.move()
    snake.append();
    snake.move()
    snake.append();
    snake.move()
    snake.append();
}

function update() {
    snake.move();
    game.render();
    canChangeDirection = true;
}

function changeDirection(e) {
    if (!canChangeDirection) {
        return;
    }
    switch (e.keyCode) {
        case 37:
            if (head.direction != 'RIGHT') {
                head.setDirection('LEFT');
                canChangeDirection = false;
            }
            break;
        case 38:
            if (head.direction != 'DOWN') {
                head.setDirection('UP');
                canChangeDirection = false;
            }
            break;
        case 39:
            if (head.direction != 'LEFT') {
                head.setDirection('RIGHT');
                canChangeDirection = false;
            }
            break;
        case 40:
            if (head.direction != 'UP') {
                head.setDirection('DOWN');
                canChangeDirection = false;
            }
            break;
    }
}

window.onload = start;