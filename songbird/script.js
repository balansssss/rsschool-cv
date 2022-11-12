const btnStartQuiz = document.querySelector('#startQuiz');

const pages = document.querySelectorAll('main.main');
const pgMain = document.querySelector('main.main-page');
const pgQuiz = document.querySelector('main.quiz-page');

const nav = document.querySelector('#nav');

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