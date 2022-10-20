const btnStart = document.querySelector('#btnStart');

const gameContainer = document.querySelector('#gameContainer');

const countMoves = document.querySelector('#countMoves');
const frameSize = document.querySelector('#frameSize');

class GamePuzzle {
    constructor(size) {
        this.time = 0;
        this.moves = 0;
        this.size = size;
        this.answer = null;
        this.setSize();
    }

    start() {

    }

    setSize() {
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }

        const size = this.size;

        const sizeText = `${size}x${size}`;
        gameContainer.className = 'game _' + sizeText;
        frameSize.innerHTML = sizeText;

        let puzzles = [];
        const countPuzzles = Math.pow(size, 2) + 1;
        for (let i = 1; i < countPuzzles; i++) {
            if (i === countPuzzles - 1) {
                puzzles.push(`<div class="puzzle active"></div>`);
            } else {
                puzzles.push(`<div class="puzzle">${i}</div>`);
            }
        }
        shuffle(puzzles);
        gameContainer.innerHTML = puzzles.join('');
    }
}

let game = new GamePuzzle(3);

document.addEventListener('click', e => {
    switch (e.target) {
        case btnStart:
            game.start();
            break;
    }
})
