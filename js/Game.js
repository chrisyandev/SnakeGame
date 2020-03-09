class Game {
    constructor(boardWidth, boardHeight, snakePosX, snakePosY, snakeDirection) {
        this.board = new Board(boardWidth, boardHeight);
        this.snake = new Snake(snakePosX, snakePosY, snakeDirection);
    }

    /**
     * For every board cell, checks if its position matches with snake's
     * head position. Checks the positions of the parts following if no
     * match is found. If there's a match, sets the appropriate image.
     * If the cell's position doesn't match with snake's head position
     * or snake's parts positions, set the appropriate image.
     */
    render() {
        let head = this.snake.head;
        for (const cell of this.board.cells) {
            let cellX = parseInt(cell.getAttribute('x'));
            let cellY = parseInt(cell.getAttribute('y'));
            let matchFound = false;

            if (cellX === head.x && cellY === head.y) {
                // cell.children[0].remove(); or setting cell.children[0].src
                // doesn't work.
                let image = document.querySelector('[x="' + cellX + '"][y="' 
                    + cellY + '"]').children[0];
                image.src = 'images/snake-head.png';
                matchFound = true;
            }

            if (!matchFound) {
                for (let node = this.snake.head; node.next != null; node = node.next) {
                    if (cellX === node.next.x && cellY === node.next.y) {
                        let image = document.querySelector('[x="' + cellX +
                            '"][y="' + cellY + '"]').children[0];
                        image.src = 'images/snake-body.png';
                        matchFound = true;
                    }
                }
            }

            if (!matchFound) {
                let image = document.querySelector('[x="' + cellX +
                    '"][y="' + cellY + '"]').children[0];
                image.src = 'images/floor-1.png';
            }
        }
    }
}