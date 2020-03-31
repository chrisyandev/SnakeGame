class Game {
    SNAKE_BODY = '<img src="images/snake-body.png" alt="snake-body" />';
    FLOOR = '<img src="images/floor-1.png" alt="floor"/>';
    GOOD_FOOD = '<img src="images/egg.png" alt="good-food"/>';
    BAD_FOOD = '<img src="images/bad-fruit.png" alt="bad-food" />';


    constructor(boardWidth, boardHeight, snakePosX, snakePosY, snakeDirection) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.snake = new Snake(snakePosX, snakePosY, snakeDirection);
        this.foods = [];

        // .bind(this) is necessary because the context of "this" is lost when
        // using setInterval() in generateFoodEvery()
        this.generateFoodEvery = this.generateFoodEvery.bind(this);
        this.generateRandomInteger = this.generateRandomInteger.bind(this);
        this.foodType = this.foodType.bind(this);
        this.generateFood = this.generateFood.bind(this);
        this.removeFood = this.removeFood.bind(this);
        this.render = this.render.bind(this);
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
     * Generates food every 'timeout' seconds. If the timeout is not specified,
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
        let rowNumber = this.generateRandomInteger(this.boardWidth);
        let colNumber = this.generateRandomInteger(this.boardHeight);
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
     * Uses an html table to display the board.
     */
    render() {
        if (this.table === undefined) {
            this.createTable(); 
        }
        for (let i = 0; i < this.boardWidth; i++) {
            let row = this.table.rows[i];
            for (let j = 0; j < this.boardHeight; j++) {
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

    /**
     * Helper method for render()
     */
    createTable() {
        let tableEl = document.createElement('table');
        for (let i = 0; i < this.boardWidth; i++) {
            let rowEl = document.createElement('tr');
            for (let j = 0; j < this.boardHeight; j++) {
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