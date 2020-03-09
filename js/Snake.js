class Head {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.next = null;
    }

    nextPosition() {
        switch (this.direction) {
            case 'UP':
                return {x: this.x, y: this.y - 1};
            case 'DOWN':
                return {x: this.x, y: this.y + 1};
            case 'LEFT':
                return {x: this.x - 1, y: this.y};
            case 'RIGHT':
                return {x: this.x + 1, y: this.y};
        }
    }

    setDirection(direction) {
        this.direction = direction;
    }
}

class Part {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.next = null;
    }
}

/** Creates a singly-linked list. */
class Snake {
    constructor(x, y, direction) {
        this.head = new Head(x, y, direction);
        this.tail = this.head;
        this.tailLastPosX = undefined;
        this.tailLastPosY = undefined;
        this.length = 1;
    }

    move() {
        let nextPosition = this.head.nextPosition();
        this.shift(this.head, nextPosition.x, nextPosition.y);
    }

    /**
     * Shifts the head then shifts each node after.
     * 
     * Saves the head's initial position which will be empty after
     * shifting it.
     * 
     * Before moving the next node, the next node's initial position 
     * needs to be saved. Since 'emptyX' and 'emptyY' still hold needed
     * values, 'x' and 'y' are used.
     */
    shift(head, x, y) {
        let emptyX = head.x;
        let emptyY = head.y;
        head.x = x;
        head.y = y;

        let node = head;
        while (node.next != null) {
            x = emptyX;
            y = emptyY;
            emptyX = node.next.x;
            emptyY = node.next.y;
            node.next.x = x;
            node.next.y = y;
            node = node.next;
        }
        this.tailLastPosX = emptyX;
        this.tailLastPosY = emptyY;
    }

    /**
     * Places a new node where snake's tail was before last move.
     * Must call move() at least once before each append or the nodes
     * will overlap.
     */
    append() {
        let node = new Part(this.tailLastPosX, this.tailLastPosY);
        this.tail.next = node;
        this.tail = node;
        this.length++;
    }
}

