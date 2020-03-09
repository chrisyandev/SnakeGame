class Game {
    constructor(boardWidth, boardHeight, snakePosX, snakePosY, snakeDirection) {
        this.board = new Board(boardWidth, boardHeight);
        this.snake = new Snake(snakePosX, snakePosY, snakeDirection);
    }

    /**
     * Starts by painting an empty board. Then places images for the
     * head and the rest of the nodes in the list. Before setting the
     * image, makes sure querySelector returned a span, because if any
     * parts of the snake goes off the board, querySelector returns null
     * and an error will occur due to getting children of null.
     * 
     * Note: Since querySelector returns null when head goes off-screen,
     * we can use it to determine game over.
     */
    render() {
        for (const cell of this.board.cells) {
            let cellX = parseInt(cell.getAttribute('x'));
            let cellY = parseInt(cell.getAttribute('y'));
            let image = document.querySelector('[x="' + cellX + '"][y="' +
                cellY + '"]').children[0];
            image.src = 'images/floor-1.png';
        }

        let head = this.snake.head;
        let span = document.querySelector('[x="' + head.x + '"][y="' +
            head.y + '"]');
        if (span != null) {
            span.children[0].src = 'images/snake-head.png';
        }

        let node = head;
        while (node.next != null) {
            let span = document.querySelector('[x="' + node.next.x + '"][y="' +
                node.next.y + '"]');
            if (span != null) {
                span.children[0].src = 'images/snake-body.png';
            }
            node = node.next;
        }
    }

    /**
     * Render OPTION 2. Currently using render() due to better efficiency
     * and shorter code.
     * 
     * For every board cell, checks if its position matches with snake's
     * head position. If the cell doesn't match, it means it's not the
     * head, so it checks the positions of the parts following. If there's
     * still no match, it means the cell is empty. Sets the appropriate
     * images for each cell.
     */
    render2() {
        let head = this.snake.head;
        for (const cell of this.board.cells) {
            let cellX = parseInt(cell.getAttribute('x'));
            let cellY = parseInt(cell.getAttribute('y'));
            let matchFound = false;

            if (cellX === head.x && cellY === head.y) {
                // cell.children[0].remove(); or setting cell.children[0].src
                // doesn't work.
                let image = document.querySelector('[x="' + cellX + '"][y="' +
                    cellY + '"]').children[0];
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