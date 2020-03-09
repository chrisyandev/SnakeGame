class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = [];
    }

    /**
     * Creates span elements to represent cells, each holding an image.
     * 
     * Adds each cell into a div. The cells will appear in one row,
     * so in order to create a board, it adds a break after every
     * nth cell, where n is the width.
     */
    create() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let span = document.createElement('SPAN');
                span.setAttribute('x', x);
                span.setAttribute('y', y);
                span.innerHTML += '<img src="images/floor-1.png">';
                this.cells.push(span);
            }
        }

        let container = document.createElement('DIV');
        container.id = 'board';
        for (let i = 0; i < this.cells.length; i++) {
            container.appendChild(this.cells[i]);
            if ((i + 1) % this.width === 0) {
                container.innerHTML += '<br>';
            }
        }
        document.body.appendChild(container);
    }
}
