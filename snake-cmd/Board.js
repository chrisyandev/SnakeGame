class Board {
    constructor(nRows, nCols) {
        this.nRows = nRows;
        this.nCols = nCols;

        this.foodCoordinates = [];

        // TODO: remove hard coding.
        this.snake = new Snake({x: 5, y: 5}, {x: 4, y: 5});
    }

    render() {

    }

    createFood() {

    }

    clearBoard() {

    }
}
