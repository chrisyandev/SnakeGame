exports.Cell= class Cell {
    constructor(type, direction, next, previous, initialPosition) {
        this.type = type;
        this.direction = direction;
        this.next = next;
        this.previous = previous;
        this.position = initialPosition;
    }

    nextPosition() {
        // Similar to Snake.js line 36.
        let nextPosition = Object.assign({}, this.position);
        switch (this.direction) {
            case 'UP':
                nextPosition.y = this.position.y - 1;
                break;
            case 'DOWN':
                nextPosition.y = this.position.y + 1;
                break;
            case 'LEFT':
                nextPosition.x = this.position.x - 1;
                break;
            case 'RIGHT':
                nextPosition.x = this.position.x + 1;
                break;
        }
        return nextPosition;
    }
};
