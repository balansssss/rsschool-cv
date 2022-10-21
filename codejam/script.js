const btnStart = document.querySelector('#btnStart');
const btnStop = document.querySelector('#btnStop');

const gameContainer = document.querySelector('#gameContainer');

const countMoves = document.querySelector('#countMoves');
const timeTimer = document.querySelector('#timeTimer');
const frameSize = document.querySelector('#frameSize');

const otherSizes = document.querySelector('.otherSize');

function getEmptyPuzzle() {
    return gameContainer.querySelector('#emptyPuzzle');
}

class GamePuzzle {
    constructor(size) {
        this.time = ['00', '00'];
        this.moves = 0;
        this.size = 0;
        this.gameStarted = false;
        this.answer = null;
        this.timer = {
            timer: null,
            timerPause: false
        }
        this.setSize(size);
    }

    checkGame() {
        if (this.gameStarted || this.timer.timerPause) {
            return confirm('Are you sure? Result will be lost if You don\'t save it!');
        } else {
            return true;
        }
    }

    start() {
        if (!this.gameStarted) {
            this.startTimer();
            this.gameStarted = true;
        }
    }

    stop() {
        if (this.gameStarted) {
            this.stopTimer();
            this.gameStarted = false;
        }
    }

    startTimer() {
        this.timer.timerPause = false;
        this.timer.timer = setInterval(() => {
            this.time[1] = Number(this.time[1]) + 1;
            if (this.time[1] === 60) {
                this.time[0] = Number(this.time[0]) + 1;
                this.time[1] = 0;
                if (this.time[0] < 10) {
                    this.time[0] = '0' + this.time[0];
                }
            }
            if (this.time[1] < 10) {
                this.time[1] = '0' + this.time[1];
            }
            timeTimer.innerHTML = this.time.join(':');
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer.timer);
        this.timer.timerPause = true;
    }

    setSize(size) {

        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }

        this.size = size;

        const sizeText = `${size}x${size}`;
        gameContainer.className = 'game _' + sizeText;
        frameSize.innerHTML = sizeText;
        timeTimer.innerHTML = this.time.join(':');
        countMoves.innerHTML = this.moves;

        let puzzles = [];
        const countPuzzles = Math.pow(size, 2) + 1;
        for (let i = 1; i < countPuzzles; i++) {
            if (i === countPuzzles - 1) {
                puzzles.push(`<div class="puzzle empty" id="emptyPuzzle"></div>`);
            } else {
                puzzles.push(`<div class="puzzle">${i}</div>`);
            }
        }
        shuffle(puzzles);
        gameContainer.innerHTML = puzzles.join('');
    }

    movePuzzle(chosedPuzzle, emptyPuzzle) {
        if (this.gameStarted) {
            emptyPuzzle.classList.remove('empty');
            emptyPuzzle.innerHTML = chosedPuzzle.innerHTML;
            emptyPuzzle.id = null;
            chosedPuzzle.classList.add('empty');
            chosedPuzzle.innerHTML = '';
            chosedPuzzle.id = 'emptyPuzzle';

            this.moves += 1;
            countMoves.innerHTML = this.moves;
        } else {
            alert('Game doesn\'t running');
        }
    }
}

let game = new GamePuzzle(3);

document.addEventListener('click', e => {
    switch (e.target) {
        case btnStart:
            game.start();
            break;
        case btnStop:
            game.stop();
            break;
    }
});

otherSizes.addEventListener('click', e => {
    if (e.target.localName === 'a') {
        const size = Number(e.target.getAttribute('size'));
        if (size !== game.size) {
            if (game.checkGame()) {
                game.stopTimer();
                game = new GamePuzzle(size);
            }
        }
    }
});

gameContainer.addEventListener('click', e => {
    const emptyPuzzle = getEmptyPuzzle();
    if (e.target !== emptyPuzzle) {
        game.movePuzzle(e.target, emptyPuzzle);
    }
});
