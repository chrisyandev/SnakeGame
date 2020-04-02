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
     * Starts at the head and saves its current position into 'emptyX'
     * and 'emptyY' before shifting. Shifts the head.
     * 
     * Copies the empty position into 'newX' and 'newY' to be used for
     * the next node. Moves pointer to the next node.
     * 
     * The 'next' property of the last node in the list is null. So
     * when node === null, we know the list has ended.
     */
    shift(head, newX, newY) {
        let node = head;
        let emptyX;
        let emptyY;

        while (node !== null) {
            emptyX = node.x;
            emptyY = node.y;
            node.x = newX;
            node.y = newY;
            newX = emptyX;
            newY = emptyY;
            node = node.next;
        }

        this.tailLastPosX = emptyX;
        this.tailLastPosY = emptyY;
    }

    /**
     * Size is the number of body parts including the head. 
     * It represents the player's score. 
     */
    size() {
        let score = 0;
        let node = head; 
        while (node !== null) {
            score++; 
            node = node.next; 
        }
        return score; 
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

	/** 
	 * It returns true if the current location of the head is same as location of 
	 * one of the parts of the body. 
	 **/
	hasBitItself() {
		let node = head.next; 
		while (node !== null) {
			if (node.x === head.x && node.y === head.y) {
				return true; 
            }
            node = node.next; 
		}
		return false; 
	}

    /**
     * Gets coordinates of a point and returns true if a part of the snake's 
     * body has the same position as that point. 
     * This method is currently only used by Game.render3 method. 
     */
    occupies(x, y) {
        let node = head; 
        while (node !== null) {
            if (node.x === x && node.y === y) {
                return true; 
            }
            node = node.next; 
        }
        return false; 
    }
}

