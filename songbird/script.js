import { birdsData } from "./data/data.js";

const btnStartQuiz = document.querySelector('#startQuiz');
const btnNextQuestion = document.querySelector('#nextQuestion');
const btnRestartQuiz = document.querySelector('#btnRestartQuiz');

const pages = document.querySelectorAll('main.main');

const nav = document.querySelector('#nav');

const quizAnswers = document.querySelector('#quizAnswers');

const res = document.querySelector('#res');

const answerInfo = document.querySelector('#answerInfo');

const player = document.querySelector('#player');

const resQuiz = document.querySelector('#resultQuiz');

const wrongAudio = new Audio();
wrongAudio.src = "./assets/audio/wrong-answer.mp3";
const rightAudio = new Audio();
rightAudio.src = "./assets/audio/right-answer.mp3";

function goToPage(page) {
    pages.forEach(p => {
        p.classList.remove('active');
        if (p.classList.value.includes(page)) {
            p.classList.add('active');
        }
    });
}

nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
        goToPage(e.target.getAttribute('linkTo'));
    }
});

btnStartQuiz.addEventListener('click', () => goToPage('quiz-page'));

/*  номер текущего вопроса,
    номер правильного ответа, 
    кол-во балов,
    следующий вопрос
*/
let curQuestion = 0;
let rightAnswer = null;
let point = 5;
let nextQuestion = false;

function getRightAnswer(length) {
    return Math.floor(Math.random() * length);
}

function playSound(sound) {
    sound.play();
}

function prepNextQuestion() {
    if (birdsData.length - 1 > curQuestion) {
        curQuestion += 1;
        rightAnswer = null;
        point = 5;
        nextQuestion = false;
    } else {
        resQuiz.innerHTML = res.innerHTML;
        goToPage('result-page');
        curQuestion = 0;
        rightAnswer = null;
        point = 5;
        nextQuestion = false;
        res.innerHTML = 0;
    }
    setQuestion(curQuestion);
}

function setAnswers(numberQuestion) {
    const curData = birdsData[numberQuestion];
    quizAnswers.innerHTML = '';
    for (let i = 0; i < curData.length; i++) {
        quizAnswers.innerHTML += `<li class="quiz-page__quiz__item" status="${rightAnswer === i}" answer-id="${i}">${curData[i].name}</li>`;
    }
    answerInfo.innerHTML = `Послушайте плеер.<br>
        Выберите птицу из списка`;
}

function setQuestion(numberQuestion) {
    rightAnswer = getRightAnswer(birdsData[numberQuestion].length);
    player.src = birdsData[numberQuestion][rightAnswer].audio;
    btnNextQuestion.setAttribute('disabled', true);
    setAnswers(numberQuestion);
}

function getAnswerInfo(answerId) {
    const answer = birdsData[curQuestion][answerId];
    let html = `<div class="quiz-page__info item-media">
        <img src="${answer.image}"
            class="item-media__image">
        <div class="item-media__info">
            <h2 class="item-media__info__title">${answer.name}</h2>
            <span class="item-media__info__desc">${answer.species}</span>
            <audio class="item-media__info__audio" controls src="${answer.audio}">
        </div>    
    </div>   
    <div class="quiz-page__info__text">
        ${answer.description}
    </div>`;
    answerInfo.innerHTML = html;
}

function checkAnswer(answer) {
    const result = answer.getAttribute('status');
    const answerId = answer.getAttribute('answer-id');
    if (!nextQuestion) {
        if (result === 'true') {
            playSound(rightAudio);
            res.innerHTML = Number(res.innerHTML) + point;
            nextQuestion = true;
            player.pause();
            btnNextQuestion.removeAttribute('disabled');
        } else {
            playSound(wrongAudio);
            point -= 1;
        }
        answer.classList.add('toched');
    }
    getAnswerInfo(answerId);
}

if (birdsData) {
    setQuestion(curQuestion);
}

quizAnswers.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
        checkAnswer(e.target)
    }
});

btnNextQuestion.addEventListener('click', () => {
    prepNextQuestion();
});

btnRestartQuiz.addEventListener('click', () => {
    goToPage('quiz-page');
});