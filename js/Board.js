class Board {
    constructor(nRows, nCols) {
        this.nRows = nRows;
        this.nCols = nCols;

        this.foodCoordinates = [];

        this.cells = [];

        // TODO: remove hard coding.
        // this.snake = new Snake({x: 5, y: 5}, {x: 4, y: 5});
    }

    create() {
        for (let y = 0; y < this.nRows; y++) {
            for (let x = 0; x < this.nCols; x++) {
                let span = document.createElement('SPAN');
                span.coords = x + ',' + y;
                span.innerHTML += '<img src="images/floor-1.png">';
                this.cells.push(span);
            }
        }

        let container = document.createElement('DIV');
        container.id = 'board';
        for (let i = 0; i < this.cells.length; i++) {
            container.appendChild(this.cells[i]);
            if ((i + 1) % this.nCols === 0) {
                container.innerHTML += '<br>';
            }
        }
        document.body.appendChild(container);
    }

    createFood() {

    }

    clearBoard() {

    }
}
