class Game {
    constructor(boardWidth, boardHeight, snakePosX, snakePosY, snakeDirection) {
        this.board = new Board(boardWidth, boardHeight);
        this.snake = new Snake(snakePosX, snakePosY, snakeDirection);
    }

    /**
     * Starts by painting an empty board. Then places images for the
     * snake's head and body parts. Before setting the image, makes
     * sure querySelector didn't return null, because if any parts of
     * the snake go off the board, querySelector returns null and an
     * error will occur due to getting children of null.
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

        let node = this.snake.head;
        while (node !== null) {
            let span = document.querySelector('[x="' + node.x + '"][y="' +
                node.y + '"]');
            if (span !== null) {
                if (node === this.snake.head) {
                    span.children[0].src = 'images/snake-head.png';
                } else {
                    span.children[0].src = 'images/snake-body.png';
                }
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

    /**
     * Render option3, uses an html table to display the board.
     * 
     * How it works: 
     *  It goes through every cell on the board and checks if that cell 
     *  is occupied by the snake, if it is occupied it paints it changed the 
     *  color of that cell to blue. We can also use an image element to 
     *  display the snake.
     * 
     * This is not as efficient as the other two options (altough the difference
     * is not even noticable because board is small), but it uses a 
     * neater approach. 
     */
    render3() {
        if (this.table === undefined) {
            this.createTable(); 
        }
        for (let i = 0; i < 10; i++) {
            let row = this.table.rows[i];
            for (let j = 0; j < 10; j++) {
                let cell = row.cells[j];
                if (this.snake.isOccupied(j, i)) {
                    cell.style.backgroundColor = "red";
                } else {
                    cell.style.backgroundColor = "blue";
                }
            }
        }
    }

    // Helper method for render3
    createTable() {
        let tableEl = document.createElement('table');
        for (let i = 0; i < 10; i++) {
            let rowEl = document.createElement('tr');
            for (let j = 0; j < 10; j++) {
                let cellEl = document.createElement('td');
                rowEl.appendChild(cellEl);
            }
            tableEl.appendChild(rowEl);
        }
        this.table = tableEl; 
        document.body.appendChild(this.table); 
    }
}