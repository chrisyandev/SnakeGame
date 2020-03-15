class Game {
    SNAKE_BODY = '<img src="images/snake-body.png" alt="snake-body" />';
    FLOOR = '<img src="images/floor-1.png" alt="floor"/>';
    GOOD_FOOD = '<img src="images/egg.png" alt="good-food"/>';
    BAD_FOOD = '<img src="images/bad-fruit.png" alt="bad-food" />';


    constructor(boardWidth, boardHeight, snakePosX, snakePosY, snakeDirection) {
        this.board = new Board(boardWidth, boardHeight);
        this.snake = new Snake(snakePosX, snakePosY, snakeDirection);
        this.foods = [];

        // This is necessary to do.
        this.generateFoodEvery = this.generateFoodEvery.bind(this);
        this.generateRandomInteger = this.generateRandomInteger.bind(this);
        this.foodType = this.foodType.bind(this);
        this.generateFood = this.generateFood.bind(this);
        this.removeFood = this.removeFood.bind(this);
        this.render3 = this.render3.bind(this);
        this.generateFoodEvery();
    }

    /**
     * Removes the food at cell [x, y]
     */
    removeFood(x, y) {
        this.foods = this.foods.filter(food => !(food.x === x && food.y === y));
        this.table.rows[y].cells[x].innerHTML = "";
        this.table.rows[x].cells[y].innerHTML = this.FLOOR;
    }

    /**
     * generates food every 'timeout' seconds. If the timeout is not specified,
     * the default is 2 seconds.
     */
    generateFoodEvery(timeout) {
        if (timeout === undefined)
            timeout = 2000;
        setInterval(this.generateFood, timeout);
    }


    /**
     * Randomly generates food. The type of food (good, bad) is
     * also chosen randomly.
     */
    generateFood() {
        let rowNumber = this.generateRandomInteger(this.board.width);
        let colNumber = this.generateRandomInteger(this.board.height);
        let foodType = this.generateRandomInteger(2);
        if (this.foodType(rowNumber, colNumber) === 'NONE'
            && !this.snake.occupies(rowNumber, colNumber)) {
            this.foods.push({
                x: rowNumber,
                y: colNumber,
                type: foodType === 1 ? 'GOOD' : 'BAD'
            });
        }
    }

    /**
     * Returns 'NONE' if the cell [x, y] doesn't contain any food. Returns 'GOOD'
     * of the cell contains good food, and 'BAD' if the cell contains bad food.
     */
    foodType(x, y) {
        for (const food of this.foods) {
            if (food.x === x && food.y === y) {
                return food.type;
            }
        }
        return 'NONE';
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
    */
    render3() {
        if (this.table === undefined) {
            this.createTable(); 
        }
        for (let i = 0; i < this.board.width; i++) {
            let row = this.table.rows[i];
            for (let j = 0; j < this.board.height; j++) {
                let cell = row.cells[j];
                if (this.snake.occupies(j, i)) {
                    cell.innerHTML = this.SNAKE_BODY;
                } else {
                    switch (this.foodType(j, i)) {
                        case 'NONE':
                            cell.innerHTML = this.FLOOR;
                            break;
                        case 'GOOD':
                            cell.innerHTML = this.GOOD_FOOD;
                            break;
                        case 'BAD':
                            cell.innerHTML = this.BAD_FOOD;
                    }
                }
            }
        }
    }

    // Helper method for render3
    createTable() {
        let tableEl = document.createElement('table');
        for (let i = 0; i < this.board.width; i++) {
            let rowEl = document.createElement('tr');
            for (let j = 0; j < this.board.height; j++) {
                let cellEl = document.createElement('td');
                rowEl.appendChild(cellEl);
            }
            tableEl.appendChild(rowEl);
        }
        this.table = tableEl; 
        document.body.appendChild(this.table); 
    }

    /**
     * Generates a random integer between 0 and n. (inclusive, exclusive)
     */
    generateRandomInteger(n) {
        return Math.floor(Math.random() * n);
    }
}