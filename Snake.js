const c = require('./Cell');
const Cell = c.Cell;
const readline = require('readline');

exports.Snake = class Snake {
    constructor(headPosition, tailPosition) {
        this.types = {
            HEAD: 'HEAD',
            TAIL: 'TAIL',
            BODY: 'BODY'
        };

        this.directions = {
            LEFT: 'LEFT',
            RIGHT: 'RIGHT',
            TOP: 'TOP',
            DOWN: 'DOWN'
        };

        this.head = new Cell(this.types.HEAD, this.directions.LEFT, null);
        this.tail = new Cell(this.types.TAIL, this.directions.LEFT, this.head);
        this.head.previous = this.tail;

        this.head.position = headPosition;
        this.tail.position = tailPosition;

        this.shouldAddToLength = 0;
    }

    move(direction) {
        if (direction === undefined)
            direction = this.head.direction;

        // TODO: figure out why the code below doesn't work.
        // this.iterate(cell => {
        //     if (cell.next === null) {
        //         cell.directions = direction;
        //         cell.position = cell.nextPosition();
        //     } else {
        //         cell.position = Object.assign({}, cell.next.position);
        //     }
        // });

        let iterator = this.tail;
        while (iterator != null) {
            if (iterator.next === null) {
                iterator.direction = direction;
                iterator.position = iterator.nextPosition();
            } else {
                // For some reason, "iterator.position = iterator.next.position;"
                // does not work. We have to assign each attribute individually or
                // use "Object.assign()". Be careful about this pitfall.
                iterator.position = Object.assign({}, iterator.next.position);
            }
            iterator = iterator.next;
        }
        if (this.isDead()) {
            console.log("Whoa! you died");
        }
    }

    increaseLength() {
        let newHead = new Cell(this.types.HEAD, this.head.direction, null, null,
            this.head.nextPosition());
        this.head.next = newHead;
        this.head.type = this.types.BODY;
        newHead.previous = this.head;
        this.head = newHead;
    }

    isDead() {
        return this.doesByteItself() || this.isOutOfBounds();
    }

    doesByteItself() {
        let result = false;
        this.iterate(cell => {
            if (cell.type !== 'HEAD' && this.head.position.x === cell.position.x
                && this.head.position.y === cell.position.y) {
                result = true;
            }
        });
        return result;
    }

    isOutOfBounds() {
        return false;
    }

    iterate(iteratee) {
        let iterator = this.tail;
        while (iterator != null) {
            iteratee(iterator);
            iterator = iterator.next;
        }
    }

    asArray() {
        let result = [];
        this.iterate(item => {
            result.push(item.position);
        });
        return result;
    }

    isOccupied(x, y) {
        let result = false;
        this.iterate(item => {
            if (item.position.x === x && item.position.y === y) {
                result = true;
            }
        });
        return result;
    }

    visualise(boardWidth, boardHeight) {
        // return;
        for (let i = 0; i < boardWidth; i++) {
            let str = "";
            for (let j = 0; j < boardHeight; j++) {
                if (this.isOccupied(j, i)) {
                    str += "@";
                } else {
                    str += "#";
                }
            }
            console.log(str);
        }
        console.log("");
    }
};

