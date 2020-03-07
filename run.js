const s = require('./Snake.js');
const Snake = s.Snake;
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

snake = new Snake({x: 5, y: 5}, {x: 4, y: 5});
function askMove() {
    readline.question("What is the next move?", m => {
        if (m === "feed") {
            snake.increaseLength();
        } else {
         snake.move(m.toUpperCase());
        }
        snake.visualise(10, 10);
        askMove();
    });
}

askMove();

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
