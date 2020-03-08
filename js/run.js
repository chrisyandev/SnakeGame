// const s = require('./Snake.js');
// const Snake = s.Snake;
// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

let board;
let snake;
let ticker;
let currentDirection = 'LEFT';

function start() {
    board = new Board(10, 10);
    snake = new Snake({x: 5, y: 5}, {x: 4, y: 5});
    document.addEventListener("keydown", changeDirection);
    setInterval(update, 500);
    board.create();
}

function update() {
    snake.move(currentDirection);
}

function changeDirection(e) {
    switch (e.keyCode) {
        case 37:
            currentDirection = 'LEFT';
        case 38:
            currentDirection = 'UP';
        case 39:
            currentDirection = 'RIGHT';
        case 40:
            currentDirection = 'DOWN';
    }
}

start();


// console.log(snake.tail);

// console.log(snake.asArray());
// snake.visualise(10, 10);
//
// snake.move('DOWN');
// console.log(snake.asArray());
// snake.visualise(10, 10);
//
// snake.move('LEFT');
// console.log(snake.asArray());
// snake.visualise(10, 10);
//
// snake.increaseLength();
// console.log(snake.asArray());
// snake.visualise(10, 10);
//
// snake.move('DOWN');
// console.log(snake.asArray());
// snake.visualise(10, 10);
//
// snake.increaseLength();
// console.log(snake.asArray());
// snake.visualise(10, 10);
//
// snake.move();
// console.log(snake.asArray());
// snake.visualise(10, 10);
//
// snake.move('RIGHT');
// console.log(snake.asArray());
// snake.visualise(10, 10);
//
// snake.increaseLength();
// console.log(snake.asArray());
// snake.visualise(10, 10);
//
// snake.increaseLength();
// console.log(snake.asArray());
// snake.visualise(10, 10);
//
// snake.increaseLength();
// console.log(snake.asArray());
// snake.visualise(10, 10);
//
// snake.move('UP');
// console.log(snake.asArray());
// snake.visualise(10, 10);
//
// snake.move('LEFT');
// console.log(snake.asArray());
// snake.visualise(10, 10);
//
// snake.move('DOWN');
// console.log(snake.asArray());
// snake.visualise(10, 10);

// console.log(snake.doesByteItself());
