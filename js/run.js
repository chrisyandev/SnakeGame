let game;
let snake;
let head;
let ticker;

var firebaseConfig = {
    apiKey: "AIzaSyDf3sskTnLBowdxipepIzzd7jozfIv0YxA",
    authDomain: "snake-d38c4.firebaseapp.com",
    databaseURL: "https://snake-d38c4.firebaseio.com",
    projectId: "snake-d38c4",
    storageBucket: "snake-d38c4.appspot.com",
    messagingSenderId: "631543576662",
    appId: "1:631543576662:web:7925dff3bd55017beb63f7"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const UPDATE_TIMEOUT = 250;

// Without this flag, user can move in the direct opposite
// direction (which is not what we want) if they press the
// arrow keys quickly.
let canChangeDirection = true;

/** Initial setup. */
function initial() {
    game = new Game(10, 10, 5, 7, "UP");
    snake = game.snake;
    head = snake.head;

    snake.move();
    snake.append();
    snake.move();
    snake.append();
    snake.move();
    snake.append();

    document.getElementById('container').innerHTML = "";

    createPlayMessage();
    game.render();
    document.addEventListener("keydown", handleKeydown);
    createArrowButtons();
    createScoreboard();
    
    document.body.onclick = start;
}

/** Starts the game. */
function start() {
    document.body.onclick = '';
    document.getElementById('play-message').remove();
    game.startFoodGenerationInterval(); 

    ticker = setInterval(update, UPDATE_TIMEOUT);
}

/** Creates a scoreboard. */
function createScoreboard() {
    let scoreboard = document.createElement('DIV');
    scoreboard.innerHTML = 'REMOVE THIS TEXT';
    scoreboard.style.textAlign = 'center';
    scoreboard.style.margin = '50px auto';
    scoreboard.style.fontFamily = 'Arial, Helvetica, sans-serif';
    scoreboard.style.fontSize = '18pt';
    document.getElementById('container').appendChild(scoreboard);
}

/** Message before game is started. */
function createPlayMessage() {
    let playMessage = document.createElement('P');
    playMessage.id = 'play-message';
    playMessage.innerHTML = 'Click anywhere to play';
    playMessage.style.textAlign = 'center';
    playMessage.style.fontFamily = 'Arial, Helvetica, sans-serif';
    playMessage.style.fontSize = '20pt';
    document.getElementById('container').appendChild(playMessage);
}

/** Updates the game. */
function update() {
    snake.move();

    // check if the snake ate fruit in the last move. 
    let foodType = game.foodType(snake.head.x, snake.head.y);
    if (foodType === "GOOD") {
        snake.append();
        game.removeFood(snake.head.x, snake.head.y);
    } else if (foodType === "BAD") {
        game.removeFood(snake.head.x, snake.head.y);
    }

    // check if the player lost in the last move. 
    if (snake.hasBitItself() || game.isSnakeOutOfBounds()) {
        // updating the player's record in the local storage.
        if (localStorage.getItem('record') !== null) {
            localStorage.setItem('record',
            Math.max(snake.size(), parseInt(localStorage.getItem('record'))));
        } else {
            localStorage.setItem('record', snake.size());
        }
        
        
        if (localStorage.getItem('name') === null) {
            askName();
        } 

        clearInterval(ticker); 
        alert("You lost!");
        document.body.innerHTML = '<h1 id="user-status"></h1><div id="scoreboard"><h2>Score Board</h2></div><div id="container"></div>';
        initial();

        game.clearFoodGenerationInterval(); 
        updateDatabase();
        showTopPlayers(); 
    }

    if (localStorage.getItem('name') !== null) {
        document.getElementById('user-status').innerHTML =
            localStorage.getItem('name') + ", Record: " +
            localStorage.getItem('record');
    }

    game.render();
    canChangeDirection = true;
}

function updateDatabase() {
    // if the document is already created, update it
    if (localStorage.getItem('doc_id') !== null) {
        db.collection('names').doc(localStorage.getItem('doc_id')).update({
            name: localStorage.getItem('name'),
            score: parseInt(localStorage.getItem('record'))
        }).then(() => console.log("Updated the document"));
        return;
    }

    // the document doesn't exist, so add a new one. 
    db.collection('names').add({
        name: localStorage.getItem('name'),
        score: parseInt(localStorage.getItem('record'))
    }).then(function (docRef) {
        console.log("Added documetn with ID: ", docRef.id);
        localStorage.setItem('doc_id', docRef.id); 
    })
}

async function showTopPlayers() {
    let topPlayers = await db.collection('names').orderBy('score').limit(10).get();
    let scoreBoard = document.getElementById('scoreboard'); 
    topPlayers.docs.reverse().forEach(player => {
        console.log(player.data()); 
        scoreBoard.innerHTML += '<br>' + player.data().name + ' '
            + player.data().score; 
    })
}

function askName() {
    let name = prompt("What is you name?");
    localStorage.setItem('name', name);
}

/** Creates buttons for controlling the snake. */
function createArrowButtons() {
    let arrowLeft = document.createElement('IMG');
    arrowLeft.src = 'images/arrow-left.png';
    arrowLeft.onclick = () => {
        changeDirection('LEFT');
    };

    let arrowRight = document.createElement('IMG');
    arrowRight.src = 'images/arrow-right.png';
    arrowRight.onclick = () => {
        changeDirection('RIGHT');
    };

    let arrowUp = document.createElement('IMG');
    arrowUp.src = 'images/arrow-up.png';
    arrowUp.onclick = () => {
        changeDirection('UP');
    };

    let arrowDown = document.createElement('IMG');
    arrowDown.src = 'images/arrow-down.png';
    arrowDown.onclick = () => {
        changeDirection('DOWN');
    };

    let div = document.createElement('DIV');
    div.id = 'arrow-buttons';
    div.appendChild(arrowLeft);
    div.appendChild(arrowRight);
    div.appendChild(arrowUp);
    div.appendChild(arrowDown);
    document.getElementById('container').appendChild(div);
}

/** Allows arrow keys to control the snake. */
function handleKeydown(event) {
    switch (event.code) {
        case "ArrowLeft":
            changeDirection("LEFT");
            break;
        case "ArrowRight":
            changeDirection("RIGHT");
            break;
        case "ArrowDown":
            changeDirection("DOWN");
            break;
        case "ArrowUp":
            changeDirection("UP");
            break;
    }
}

/**
 * Gets a string indicating the new direction of the snake.
 * This function is called after pressing a keyboard key or
 * after clicking an arrow-key button on a mobile device.
 */
function changeDirection(dir) {
    if (!canChangeDirection) {
        return;
    }
    switch (dir) {
        case "LEFT":
            if (head.direction !== "RIGHT") {
                head.setDirection("LEFT");
                canChangeDirection = false;
            }
            break;
        case "UP":
            if (head.direction !== "DOWN") {
                head.setDirection("UP");
                canChangeDirection = false;
            }
            break;
        case "RIGHT":
            if (head.direction !== "LEFT") {
                head.setDirection("RIGHT");
                canChangeDirection = false;
            }
            break;
        case "DOWN":
            if (head.direction !== "UP") {
                head.setDirection("DOWN");
                canChangeDirection = false;
            }
            break;
    }
}

window.onload = initial;
