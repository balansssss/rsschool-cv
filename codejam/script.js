document.body.innerHTML = '<div class="container"> \
<div class="header"> \
    <div class="buttons"> \
        <button id="btnStart" class="blue">Shuffle and start</button> \
        <button id="btnStop" class="grey">Stop</button> \
        <button id="btnSave" class="blue">Save</button> \
        <button id="btnResults" class="blue">Results</button> \
        <button id="btnSound" class="sound on">Sound On</button> \
    </div> \
    <div class="info"> \
        <div class="moves"> \
            <span class="title">Moves:</span> \
            <span id="countMoves">0</span> \
        </div> \
        <div class="time"> \
            <span class="title">Times:</span> \
            <span id="timeTimer">00:00</span> \
        </div> \
    </div> \
</div> \
<div id="gameContainer" class="game"> \
</div> \
<div class="footer"> \
    <div class="frameSize"> \
        <span class="title">Frame size:</span> \
        <span id="frameSize">4x4</span> \
    </div> \
    <div class="otherSize"> \
        <span class="title">Other sizes:</span> \
        <span class="sizes"> \
            <a href="#3" size="3">3x3</a> \
        </span> \
        <span class="sizes"> \
            <a href="#4" size="4">4x4</a> \
        </span> \
        <span class="sizes"> \
            <a href="#5" size="5">5x5</a> \
        </span> \
        <span class="sizes"> \
            <a href="#6" size="6">6x6</a> \
        </span> \
        <span class="sizes"> \
            <a href="#7" size="7">7x7</a> \
        </span> \
        <span class="sizes"> \
            <a href="#8" size="8">8x8</a> \
        </span> \
    </div> \
</div> \
<div id="dvRes" class="results hide"> \
    <table id="tblRes"></table> \
    <button id="btnHideRes" class="btnHideRes">Close</button> \
</div > \
</div > ';

const userName = prompt('Hello! What\'s your name? It\'s need for save result!');

const btnStart = document.querySelector('#btnStart');
const btnStop = document.querySelector('#btnStop');
const btnSave = document.querySelector('#btnSave');
const btnSound = document.querySelector('#btnSound');
const btnResults = document.querySelector('#btnResults');
const btnHideRes = document.querySelector('#btnHideRes');

const gameContainer = document.querySelector('#gameContainer');
const tblRes = document.querySelector('#tblRes');
const dvRes = document.querySelector('#dvRes');

const countMoves = document.querySelector('#countMoves');
const timeTimer = document.querySelector('#timeTimer');
const frameSize = document.querySelector('#frameSize');

const otherSizes = document.querySelector('.otherSize');

function getEmptyPuzzle() {
    return gameContainer.querySelector('#emptyPuzzle');
}

function getPuzzles() {
    return gameContainer.querySelectorAll('.puzzle');
}

function getResults() {
    const results = JSON.parse(window.localStorage.getItem('results'));
    const max = results.length > 10 ? 10 : results.length;
    results.sort((a, b) => Number(a.score) - Number(b.score));

    let resTd = '<thead><tr><th>№</th><th>User</th><th>Size</th><th>Moves</th><th>Time</th></tr></thead><tbody>';
    for (let i = 0; i < max; i++) {
        resTd += `<tr><td>${i + 1}</td><td>${results[i].user}</td><td>${results[i].size}</td><td>${results[i].moves}</td><td>${results[i].time.join(':')}</td></tr>`;
    }
    resTd += '</tbody>';
    tblRes.innerHTML = resTd;
    dvRes.classList.remove('hide');
}

const sound = new Audio('./assets/sound/inecraft_damage.mp3');
let playSound = true;

class GamePuzzle {
    constructor(size, user, moves = 0, time = ['00', '00']) {
        this.user = user;
        this.time = time;
        this.moves = moves;
        this.size = 0;
        this.gameStarted = false;
        this.answer = '';
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

    checkResult() {
        const puzzles = getPuzzles();
        let resPuzzles = '';
        for (let i = 0; i < puzzles.length; i++) {
            resPuzzles += Boolean(puzzles[i].innerHTML) ? puzzles[i].innerHTML : 'empty';
        }
        if (this.answer === resPuzzles) {
            alert(`Hooray! You solved the puzzle in ${this.time.join(':')} and ${this.moves} moves!`);
            this.stop();
            let curRes = JSON.parse(window.localStorage.getItem("results"));
            if (!curRes) {
                curRes = [];
            }
            curRes.push({
                user: this.user,
                time: this.time,
                size: this.size,
                score: (Number(this.time[0]) * 60 + Number(this.time[1])) * this.moves,
                moves: this.moves
            });
            window.localStorage.setItem('results', JSON.stringify(curRes));
            game = new GamePuzzle(this.size, userName);
        }
    }

    saveGame() {
        if (this.gameStarted || this.timer.timerPause) {
            const game = [];
            const puzzles = getPuzzles();
            for (let i = 0; i < puzzles.length; i++) {
                game.push(puzzles[i].innerHTML);
            }
            window.localStorage.setItem(this.user + '_' + this.size, JSON.stringify({
                time: this.time,
                moves: this.moves,
                game
            }));
            alert('Data save!');
        } else {
            alert('Nothing to save');
        }
    }

    loadGame(size) {
        const loadResult = JSON.parse(window.localStorage.getItem(this.user + '_' + size));
        if (loadResult) {
            const loadGame = confirm('Do you want to load saved game?');
            if (loadGame) {
                this.moves = loadResult.moves;
                this.time = loadResult.time;
                let puzzles = [];
                for (let i = 0; i < loadResult.game.length; i++) {
                    if (loadResult.game[i] === '') {
                        puzzles.push(`<div class="puzzle empty" id="emptyPuzzle"></div>`);
                    } else {
                        puzzles.push(`<div class="puzzle">${loadResult.game[i]}</div>`);
                    }
                }
                gameContainer.innerHTML = puzzles.join('');
                return true;
            }
        }
        return false;
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
        const gameLoad = this.loadGame(size);

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
                this.answer += i;
            }
        }
        this.answer += 'empty';
        if (!gameLoad) {
            shuffle(puzzles);
            gameContainer.innerHTML = puzzles.join('');
        }
    }

    movePuzzle(chosedPuzzle, emptyPuzzle) {
        if (this.gameStarted) {
            const puzzles = getPuzzles();
            const puzzlesMatrix = [];
            let cur = 0;
            let index = null;
            for (let i = 0; i < puzzles.length / this.size; i++) {
                puzzlesMatrix.push([]);
                for (let j = 0; j < puzzles.length / this.size; j++) {
                    puzzlesMatrix[i].push(puzzles[cur]);
                    if (puzzles[cur] === emptyPuzzle) {
                        index = [i, j];
                    }
                    cur += 1;
                }
            }

            const left = puzzlesMatrix[index[0]][index[1] - 1] || null;
            const right = puzzlesMatrix[index[0]][index[1] + 1] || null;
            const top = puzzlesMatrix[index[0] - 1] ? puzzlesMatrix[index[0] - 1][index[1]] : null;
            const down = puzzlesMatrix[index[0] + 1] ? puzzlesMatrix[index[0] + 1][index[1]] : null;

            if (chosedPuzzle === left || chosedPuzzle === right || chosedPuzzle === top || chosedPuzzle === down) {
                if (playSound) {
                    sound.play();
                }

                emptyPuzzle.classList.remove('empty');
                emptyPuzzle.innerHTML = chosedPuzzle.innerHTML;
                emptyPuzzle.id = null;
                chosedPuzzle.classList.add('empty');
                chosedPuzzle.innerHTML = '';
                chosedPuzzle.id = 'emptyPuzzle';

                this.moves += 1;
                countMoves.innerHTML = this.moves;

                this.checkResult();
            }
        } else {
            alert('Game doesn\'t running! Start game!');
        }
    }
}

let game = new GamePuzzle(4, userName);

btnStart.addEventListener('click', () => {
    game.start();
});

btnStop.addEventListener('click', () => {
    game.stop();
});

btnSave.addEventListener('click', () => {
    game.saveGame();
})

btnSound.addEventListener('click', () => {
    if (btnSound.className === 'sound on') {
        playSound = false;
        btnSound.className = 'sound off';
        btnSound.innerHTML = 'Sound Off';
    } else {
        playSound = true;
        btnSound.className = 'sound on';
        btnSound.innerHTML = 'Sound On';
    }
});

btnResults.addEventListener('click', getResults);

btnHideRes.addEventListener('click', () => {
    dvRes.classList.add('hide');
});

otherSizes.addEventListener('click', e => {
    if (e.target.localName === 'a') {
        const size = Number(e.target.getAttribute('size'));
        if (game.checkGame()) {
            game.stopTimer();
            game = new GamePuzzle(size, userName);
        }
    }
});

gameContainer.addEventListener('click', e => {
    const emptyPuzzle = getEmptyPuzzle();
    if (e.target !== emptyPuzzle) {
        game.movePuzzle(e.target, emptyPuzzle);
    } else {
        return;
    }
});
